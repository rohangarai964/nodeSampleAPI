const commonSpCall=require('../databse/commonSpCall')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require('../utils/asyncHandler')

const getResourceRequisition=asyncHandler(async (req,res,next)=>{
    const body=req.body
    if(body.isClosed===undefined || !body.empType || body.projectTaskID===undefined){
        throw new ApiError(400,"isClosed or empType or projectTaskID is missing")
    }
    const userId=req.user.userId
    const params=[
        {name:"U_ID",type:"Int",length:10,value:userId},
        {name:"isClosed",type:"Int",length:10,value:body.isClosed},
        {name:"Emp_type",type:"NVarChar",length:255,value:body.EmpType},
        {name:"ProjectTaskIDs",type:"NVarChar",length:10,value:body.ProjectTaskID},
   
    ];
    const result=await commonSpCall.executeApplicationSchemaSp("SpGetResourceRequisitions",params)
    return res.status(200).json(
        new ApiResponse(200,
            {
                result
            },
            "success"
        )
    )

})
const insertUpdateResourceRequisitions=asyncHandler(async (req,res,next)=>{
    const body=req.body
    
    if(!Array.isArray(body)){
        throw new ApiError(400,"Request body is missing")
    }

    const params=[
        {
            name:"jsonArray",type:"NVarChar",length:4000,value:JSON.stringify(body)
        }
        
    ]
    await commonSpCall.executeApplicationSchemaSp("SpInsertResourceRequisition",params)
    return res.status(200).json(
        new ApiResponse(
           200,
           {},
           "success" 
        )
    )
})
const deleteResourceRequisition=asyncHandler(async (req,res,next)=>{
    const requisitionId=req.params.requisitionId
    //not needed this validation. for safety purpose i added.
    if(!requisitionId){
        throw new ApiError(400,"requisitionId missing")
    }
    const params=[
        {name:"p_MRRID",type:"Int",value:requisitionId}
    ]
    await commonSpCall.executeApplicationSchemaSp("SpDeleteResourceRequisitionByMRRID",params)
    return res.status(200).json(new ApiResponse(200,null,"success"))
    
})
module.exports={
    getResourceRequisition,
    insertUpdateResourceRequisitions,
    deleteResourceRequisition
}