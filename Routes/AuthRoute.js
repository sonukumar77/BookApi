const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModal = require("../Model/UserModel");

router.post("/signup",(req,res) => {

    const {name,email,password} = req.body;

    if(!name || !email || !password) res.status(400).send({"message":"all fields requires!"});
    UserModal.findOne({email}).then((user) => {
        if(user){
            res.status(400).send({"message":"this email is  already signedup"});
        }else{

            UserModal.create({name,email,password}).then((user) => {
                res.status(200).send({"message":"new user added,signup successfull"});
            });
        }
    }).catch((err) => {
        res.status(500).send({"message":"try again later!"});
    });
});


router.post("/signin",(req,res) => {

    const {email,password} = req.body;

    if(!email || !password) res.status(400).send({"message":"all fields requires!"});
    UserModal.findOne({email}).then((user) => {
        if(user){
            if(user.password === password){
                
                // create access token using jwt
                // store this in the cookie
                // send cookie to the frontend

                const access_token = jwt.sign({
                    _id:user._id

                },"salt",{
                    expiresIn:"24h"
                });

                res.cookie("accessToken",access_token,{    // cookie(cookieName,cookieValue,optional)
                    httpOnly:true,
                    maxAge:60*60*1000
                });

                res.status(200).send({"message":"signin success",user})

            }else{
                res.status(400).send({"message":"email or password not matched"});
            }

        }else{
            res.status(400).send({"message":"email or password not matched"});
            
        }
    }).catch((err) => {
        res.status(500).send({"message":"try again later!"});
    });
})

module.exports = router;