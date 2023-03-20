const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://yuvaraj:qQkcR2GKy5pIvq5N@cluster0.luszn.mongodb.net/articles", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/wiki");

module.exports = mongoose;