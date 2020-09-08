var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost:27017/handsOnApp",{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify:true});

require("./models/comments");
require("./models/article");

const connection = mongoose.connection;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected");
});
