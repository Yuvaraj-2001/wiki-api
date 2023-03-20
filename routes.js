const express = require("express");
const app = express();
var cors = require('cors');
const bodyParser = require("body-parser");

// DB MODELS
const EmojiModel = require('./Models/emojipedia');
const ArticleModel = require('./Models/aritcles');
const PitchProContact = require('./Models/PitchPro/PitchProContact');
const PitchEmail = require('./Models/PitchPro/ResumeEmail');


// App Initialisation Start
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  cors({
    origin: "*"
}))
app.use(bodyParser.json({}));
app.use(express.static("public"));
// App Initialisation End



//  //////////////////// EmojiPedia Route Configs /////////////////////
app.route("/all-emojies").get(EmojiModel.getEmojiRequest);
app.route("/emojies/:emoji").get(EmojiModel.oneEmoji);
app.route("/emojies")
.post(EmojiModel.postOneEmoji)
.put(EmojiModel.updateOneEmoji)
.delete(EmojiModel.deleteAllEmojies);

/////////////////////// EmojiPedia Route Config End /////////////////




//////////////// Articles Route Configs //////////////////////////////
app.route("/article")
.get(ArticleModel.getAllArticles)
.post(ArticleModel.PostOneArticle)
.delete(ArticleModel.DeleteAllArticles);
// ----------- Dealing With Individual Articles --------------------
app.route("/article/:articleTitle")
.get(ArticleModel.GetSingleArticle)
.patch(ArticleModel.UpdateSingleArticle)
.put(ArticleModel.UpdateSingleArticle)
.delete(ArticleModel.DeleteSingleArticle);
//////////////// Articles Route Configs END//////////////////////////////




////////////// PITCH PRO CONTACT FORM //////////////////////////////////
app.route("/pitchpro", cors())
.get(PitchProContact.findAllEntries)
.post(PitchProContact.PostOnePitch)
.delete(PitchProContact.DeletePitch);

app.route('/pitchpro/email', cors())
.post(PitchEmail.DirectEmail);
///////////// PITCH PRO CONTACT FORM END /////////////////////////////


module.exports = app;