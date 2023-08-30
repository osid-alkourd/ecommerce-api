const { default: mongoose } = require("mongoose");

const dbConnection = () => {
    try {
       const connection = mongoose.connect(process.env.MONGODB_URL);
       console.log('success connection with e-commerce')
    } catch (err) {
        throw new Error(err);
    }
}
module.exports = dbConnection;