const mongoose = require('mongoose'); 

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the list of all users
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Alexander
 *                       role:
 *                         type: string
 *                         description: The role of the user. Can be Admin, Manager or Guest
 *                         example: Manager
 */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);

