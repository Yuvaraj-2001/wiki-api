const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.set('strictQuery', true);
app.use(bodyParser.json({}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://yuvaraj:qQkcR2GKy5pIvq5N@cluster0.luszn.mongodb.net/articles", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/wiki");

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("articles", articleSchema);

/////////////////////////All Articles///////////////////////////////////

app.route("/articles")

.get(function(req, res){
  Article.find(function(err, articles){
    if (articles) {
      const jsonArticles = JSON.stringify(articles);
      res.send(jsonArticles);
    } else {
      res.send("No articles currently in wikiDB." + err);
    }
  });
})
app.route("/article").post(function(req, res){

    const newArticle = Article({
      title: req.body.title,
      content: req.body.content
    });
    console.log(res.body);
    newArticle.save(function(err){
      if (!err){
    
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })
.delete(function(req, res){
    Article.deleteMany(function(err){
        if (!err){
        res.send("Successfully deleted all the articles in wikiDB.");
        } else {
        res.send(err);
        }
    });
});


/////////////////////////Individual Articles///////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){
  const articleTitle = req.params.articleTitle;
  Article.findOne({title: articleTitle}, function(err, article){
    if (article){
      const jsonArticle = JSON.stringify(article);
      res.send(jsonArticle);
    } else {
      res.send("No article with that title found.");
    }
  });
})

.patch(function(req, res){
  const articleTitle = req.params.articleTitle;
  Article.updateOne(
    {title: articleTitle},
    {content: req.body.content},
    function(err){
      if (!err){
        res.send("Successfully updated selected article.");
      } else {
        res.send(err);
      }
    });
})

.put(function(req, res){

  const articleTitle = req.params.articleTitle;

  Article.updateOne(
    {title: articleTitle},
    {content: req.body.content},
    function(err){
      if (!err){
        res.send("Successfully updated the content of the selected article.");
      } else {
        res.send(err);
      }
    });
})


.delete(function(req, res){
  const articleTitle = req.params.articleTitle;
  LostPet.findOneAndDelete({title: articleTitle}, function(err){
    if (!err){
      res.send("Successfully deleted selected article.");
    } else {
      res.send(err);
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
