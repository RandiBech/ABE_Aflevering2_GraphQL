
const userCollection = require('../models/user');

module.exports.authenticate = async function({username, password}) {
    const user = await userCollection.find(
        u => u.username  === username && u.password === password
    );
}
