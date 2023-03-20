const mongo = require('../environment');


const articleSchema = {
  title: String,
  content: String
};

const Article = mongo.model("articles", articleSchema);

function getAllArticles(req, res){
    Article.find(function(err, articles){
        if (articles) {
        const jsonArticles = JSON.stringify(articles);
        res.send(jsonArticles);
        } else {
        res.send("No articles currently in wikiDB." + err);
        }
    });
}
function PostOneArticle(req, res){
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
}

function DeleteAllArticles(req, res){
    Article.deleteMany(function(err){
        if (!err){
        res.send("Successfully deleted all the articles in wikiDB.");
        } else {
        res.send(err);
        }
    });
}

function GetSingleArticle(req, res){
    const articleTitle = req.params.articleTitle;
    Article.findOne({title: articleTitle}, function(err, article){
      if (article){
        const jsonArticle = JSON.stringify(article);
        res.send(jsonArticle);
      } else {
        res.send("No article with that title found.");
      }
    });
}

function UpdateSingleArticle(req, res){
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
}

function DeleteSingleArticle(req, res){
    const articleTitle = req.params.articleTitle;
    LostPet.findOneAndDelete({title: articleTitle}, function(err){
    if (!err){
        res.send("Successfully deleted selected article.");
    } else {
        res.send(err);
    }
    });
}


module.exports = {
    getAllArticles,
    PostOneArticle,
    DeleteAllArticles,
    GetSingleArticle,
    UpdateSingleArticle,
    DeleteSingleArticle
}