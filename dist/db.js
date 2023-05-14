const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://s166harth:hellohi12@cluster0.arypi.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});
module.exports = db;