const mongo = require('../environment');

// Schemas
const emojiPedia = {
  emoji: String,
  title: String,
  description: String,
}

// Model
const Emoji = mongo.model.emojies || mongo.model("emojies", emojiPedia);
function getEmojiRequest(req, res){
  Emoji.find((err, save)=>{
      if(save){
          console.log(+new Date);
          res.send(save);
      }
  });
}

function oneEmoji(req, res){
  Emoji.findOne({emoji: req.params.emoji}, function(err, result){
    if (result){
      res.status(200);
      res.send(result);
    } else {
      res.status(400);
      res.send("This Emoji is not existed in the Databse.");
    }
  });
}

function postOneEmoji(req, res){
  console.log(req.body.emoji, req.body.title, req.body.description);
  Emoji.findOne({emoji: req.body.emoji}, function(err, emoji){
    if (emoji){
      res.status(400);
      res.send("Emoji Already Exist");
    } else {
      saveAnEmoji(req);
    }
  });
}

function saveAnEmoji(req){
  Emoji({
    emoji: req.body.emoji,
    title: req.body.title,
    description: req.body.description
  }).save(function(err){
    if (!err){
      res.send("Successfully added a new Emoji.");
    } else {
      res.status(500);
      res.send(err);
    }
  });
}

function updateOneEmoji(req, res){
  const articleTitle = req.body.emoji;
  Emoji.updateOne(
    {emoji: articleTitle},
    {title: req.body.title, description: req.body.description },
    function(err){
      if (!err){
        res.send("Successfully updated the content of the selected emoji.");
      } else {
        res.send(err);
      }
    });
}

function deleteAllEmojies(req, res){
  Emoji.deleteMany(function(err){
      if (!err){
      res.send("Successfully deleted all the entries in emoji.");
      } else {
      res.send(err);
      }
  });
}
// Exporting Emoji Model
module.exports = {
  Emoji, 
  getEmojiRequest,
  oneEmoji,
  postOneEmoji,
  updateOneEmoji,
  deleteAllEmojies
};