import express from "express";
import mongoose from "mongoose";
import { shortUrl,getOriginalUrl } from "./Controllers/url.js";
import dotenv from "dotenv"

const app = express();

app.use(express.urlencoded({extended:true})); 

app.use(express.static("public"));

app.set("view engine", "ejs");

dotenv.config();


mongoose
  .connect(
    process.env.MONGO_URI,
    { dbName: "Learning_MVC" }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));


  //rendering the ejs file

  app.get('/',(req,res)=>{
    res.render('index.ejs',{shortUrl:null})
  })

  //shorting the url logic
  app.post('/short',shortUrl);

  //redirect to original url using short code : dyanmic routing
  app.get('/:shortCode',getOriginalUrl);

const port = 3000;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
