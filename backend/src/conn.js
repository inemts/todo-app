const mongoose = require('mongoose');
let conn = null;
try {
    conn = mongoose.createConnection(process.env.MONGO_URL)
} catch (error) {
    console.error('mongoDB connection error',error)
}

module.exports = conn;