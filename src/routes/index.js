const express= require('express');
// const cors2=require('cors')

const router=express.Router();

const {
    login,
    refreshAccessToken,
    getProjectSearch,
    defaultProjectBasedOnUserRole,
    
}=require("../controllers/index");
const jwtVerify = require('../middleware/auth.middleware');

router.post('/v1/auth/login',login);
router.post('/v1/auth/refresh-token',refreshAccessToken)


//secured routes
router.use(jwtVerify)
router.post('/v1/project/getProjectSearch',getProjectSearch)
router.post('/v1/project/getDefaultProjectSearch',defaultProjectBasedOnUserRole)


module.exports=router