const commonSpCall=require('../databse/commonSpCall')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require('../utils/asyncHandler')


const getProjectSearch=asyncHandler(async (req,res,next)=>{
    const activeProject=req.body.activeProject
    if(activeProject===undefined){
        throw new ApiError(400,"activeProject field is missing")
    }
    const params=[
        {name:"ActiveProject",type:"Int",length:20,value:activeProject},

    ];
    const result=await commonSpCall.executeApplicationSchemaSp("spGetProjectSearch",params)
    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "success"
        )
    )

})

const defaultProjectBasedOnUserRole=asyncHandler(async (req,res,next)=>{
    const activeProject=req.body.activeProject;
    
    if(activeProject === undefined){
        throw new ApiError(400,"activeProject field is missing")
    }
    const userId=req.user.userId
   
    
    const params=[
        {name:"ActiveProject",type:"Int",length:10,value:activeProject},
        {name:"UID",type:"Int",length:10,value:userId}
    ]
    const result=await commonSpCall.executeApplicationSchemaSp("SpGetDefaultProjectSearch",params)
    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "success"
        )
    )
})

module.exports={
    getProjectSearch,
    defaultProjectBasedOnUserRole
}