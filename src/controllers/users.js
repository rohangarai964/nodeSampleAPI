const { NVarChar } = require('mssql');
const commonSpCall=require('../databse/commonSpCall')
const jwt = require('jsonwebtoken')
const ApiError=require('../utils/ApiError')
const asyncHandler=require('../utils/asyncHandler')
const ApiResponse=require('../utils/ApiResponse')

const login=asyncHandler(async (req, res, next)=>{
            // try {    
                const body = req.body;
    
                if (!body.username || !body.password) {
                    throw new ApiError(400, "username or password is required")
                }
    
               
                const params=[
                    {name:"p_Username",type:"NVarChar",length:255,value:body.username},
                    {name:"p_password",type:"NVarChar",length:255,value:body.password}
                ]
                const result=await commonSpCall.executeApplicationSchemaSp("SpLoginUser",params)
    
                if (result.length > 0) {
                   const {accessToken,refreshToken}=await generateAccessTokenRefreshToken(result[0].userId)
                    // return res.status(200).json({ "status": true, "msg": 'successfully login', "data": result,"accessToken":accessToken,"refreshToken":refreshToken });
                    return res
                            .status(200)
                            
                            .json(
                                new ApiResponse(
                                    200, 
                                    {
                                         result, accessToken, refreshToken
                                    },
                                    "User logged In Successfully"
                                )
                            )
                } else {
                    throw new ApiError(401, "username or password is incorrect")
                }
          
        })
    
const generateAccessTokenRefreshToken=async (userId)=>{
    try{
        const params=[
            {name:"userId",type:"Int",length:20,value:userId},
        ]
        const result=await commonSpCall.executeApplicationSchemaSp("SpGetUserByID",params)
        
        
        const payload={
            id:result[0].userID,
            UserName:result[0].UserName,
            userRole:result[0].RoleDescription
        
        }
        const accessToken=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
        const refreshToken=jwt.sign({userId:result[0].userID},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE})
        // store refresh token in database
        const refreshTokenParams=[
            {name:"userId",type:"Int",length:20,value:result[0].userId},
            {name:"refreshToken",type:"NVarChar",length:255,value:refreshToken}
        ]
        await commonSpCall.executeApplicationSchemaSp("updateRefreshToken",refreshTokenParams)
        return {accessToken,refreshToken}
    }
    catch(err){
       
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


module.exports=login
