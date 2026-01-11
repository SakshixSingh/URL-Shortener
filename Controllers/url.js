
import { Url } from "../Models/Url.js"
import shortid from "shortid"

export const shortUrl = async (req,res)=>{
      const longUrl=req.body.longurl
      const shortcode=shortid.generate();

      const shortUrl=`http://localhost:3000/${shortcode}`;


      //save to database
      const newurl=new Url({shortCode: shortcode,longUrl});
      await newurl.save(); 

      console.log("short url saved ",newurl);

      res.render("index.ejs",{shortUrl })
}

export const getOriginalUrl=async(req,res)=>{
    const shortCode=req.params.shortCode

    //find in database 
    const originalUrl=await Url.findOne({shortCode})

    if(originalUrl){
        res.redirect(originalUrl.longUrl);
    }else{
        res.json({message:"invalid shortcode"});
    }
    
}