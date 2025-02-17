const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken')


const jwtVerify=asyncHandler(async (req,_,next)=>{
   try {
     const token = req.header("Authorization")?.replace("Bearer ", "")
     if(!token){
         throw new ApiError(401,"Unauthorized")
     }
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     if(decodedToken){
         req.user=decodedToken
     }
     next()
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
   }

})

module.exports=jwtVerify