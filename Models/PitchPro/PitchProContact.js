const mongo = require('../../environment');

const pitchProContactSchema = {
    email: String,
    message: String,
    phone: String,
    service: String,
    state: String,
    username: String,
}
  

const Pitch = mongo.model("pitchs", pitchProContactSchema);


function findAllEntries(req, res){
    Pitch.find(function(err, articles){
        if (articles.length === 0) {
        res.status(404);
        res.send("No Pitches are Present, Please add one");
        
        } else if(articles) {
        const jsonArticles = JSON.stringify(articles);
        console.log("coors set 1");
        res.send(jsonArticles);
        }else{
        res.status(400);
        res.send("OOPS something crahes" + err);
        }
    });
}
function PostOnePitch(req, res){
    const newPitch = Pitch({
        email: req.body.email,
        message: req.body.message,
        phone: req.body.phone,
        service: req.body.service,
        state: req.body.state,
        username: req.body.username
    });
    console.log(req.body);
    if( Object.keys(req.body).length === 0){
        res.status(400);
        res.send("There is nothing in body");
        return
    }
    newPitch.save(function(err){
        if (!err){
        res.send("Successfully added a new Pitch.");
        } else {
        res.status = 400;
        res.send(err);
        }
    });
}

function DeletePitch(req, res){
    Pitch.deleteMany(function(err){
        if (!err){
        res.send("Successfully deleted all the Entries in Pitch DB.");
        } else {
        res.status = 500;
        res.send(err);
        }
    });
  }
module.exports = {
    findAllEntries,
    PostOnePitch,
    DeletePitch
}