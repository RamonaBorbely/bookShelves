const mongoose = require('mongoose');


const connectDB = async() => {
    try {
        mongoose.set('strictQuery', false); // after mongoose 7 this is by default, say people on stack overflow.
        // got an error cause I hadnt spec db name
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true, dbName: 'booksDB'});
        console.log('connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB;