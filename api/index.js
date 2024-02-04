const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/user');
const Post=require('./models/Postschema');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secret='jfdakljfd321ja2942';
const multer=require('multer');
const fs=require('fs');
const cookieparser=require('cookie-parser');
const uploadMiddleware=multer({dest:'uploads/'});

const app=express();


app.use(cookieparser());
app.use(express.json())
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use('/uploads',express.static(__dirname+'/uploads'));
mongoose.connect('mongodb+srv://justforcoding225:DP5LgjR61AZyAArV@cluster0.nafvilm.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('connected database')).catch(err=>console.log(err));

app.post('/register',async(req,res)=>{
   const {username,password}=req.body;
   try{
   const userdoc=await User.create({username,
      password:bcrypt.hashSync(password,10)});

   res.json(userdoc)}
   catch(e)
   {
      res.status(400).json(e);
   }
});
app.post('/login',async(req,res)=>{
   const {username,password}=req.body;
  // res.json({username,password});
   const userdoc=await User.findOne({username});
  //res.json(userdoc);
   var flag=0;   
  {flag=userdoc?bcrypt.compareSync(password,userdoc.password):0};
  console.log(flag);
   if(flag)
   {
      
      jwt.sign({username,id:userdoc._id},secret,{},(err,token)=>{
         if(err)throw err;
         res.cookie('token',token).json({
            id:userdoc._id,
            username
         });
      });
   }
   else{
      res.status(400).json('wrong id');
   }
   
});
app.get('/profile',(req,res)=>{
   
   const {token}=req.cookies;
 
   try{
   jwt.verify(token,secret,{},(err,info)=>{
      if(err)throw err;
      res.json(info);
   })
   }catch(e){
      res.status(404).json({msg:'token not find'});
   }
   
});
app.post('/logout',(req,res)=>{
   res.cookie('token','').json('ok');
});

app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
   const {originalname,path}=req.file;
   const parts=originalname.split('.');
   const ext=parts[parts.length-1];
   const newpath=path+'.'+ext;
   fs.renameSync(path,newpath);
   const {token}=req.cookies;

   try{
      jwt.verify(token,secret,{},async(err,info)=>{
         const {title,summary,content}=req.body;
         const Doc=await Post.create({
            title,
            summary,
            content,
            cover:newpath,
            author:info.id
         });
         res.json(Doc);   
      })
      }catch(e){
         res.status(404).json({msg:'token not find'});
      }


   

});
app.get('/post',async(req,res)=>{
   res.json(await Post.find().
   populate('author',['username'])
   .sort({createdAt:-1})
   );
})


app.listen(4000);