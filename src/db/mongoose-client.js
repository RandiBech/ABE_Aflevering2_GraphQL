export default async function mongooseClient() {
    const mongoose = require('mongoose');

    let dbUrl = 'mongodb+srv://dbMads:Rf0e3duLljH7u4fH@teamabecluster.gk0mk.mongodb.net/HotelFour';
    
    if (process.env.NODE_ENV === 'production') {
        dbUrl = process.env.MONGODB_URI;
    }

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose connected to ${dbUrl}`);
    });
    mongoose.connection.on('error', err => {
        console.log('Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });

    async function main() {
        try {
            await mongoose.connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

        } catch (error) {
            console.log(error);
        }
    }

    const gracefulShutdown = (msg, callback) => {
        mongoose.connection.close(() => {
            console.log(`Mongoose disconnected through ${msg}`);
            callback();
        });
    };

    // For nodemon restarts                                 
    process.once('SIGUSR2', () => {
        gracefulShutdown('nodemon restart', () => {
            process.kill(process.pid, 'SIGUSR2');
        });
    });

    // For app termination
    process.on('SIGINT', () => {
        gracefulShutdown('app termination', () => {
            process.exit(0);
        });
    });

    main();

    require('./hotel');
}