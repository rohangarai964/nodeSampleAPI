const express= require('express');
// const cors2=require('cors')

const router=express.Router();

const {
    login
}=require("../controllers/index")

router.post('/v1/auth/login',login);

module.exports=router