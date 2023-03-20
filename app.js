//our imports

const appRoutes = require('./routes');



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
appRoutes.listen(port, ()=>{
  console.log("listening to the app");  
});


// // https://app-yx1k.onrender.com/articles
