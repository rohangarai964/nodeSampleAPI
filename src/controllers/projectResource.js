const commonSpCall = require("../databse/commonSpCall");
const uploadToAzureBlob = require("../services/azureBlobStorageService");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const uploadProjectResourceInformation=asyncHandler(async (req,res,next)=>{
    try {
        const createdBy=req.user.userId;
        const uploadedFileLocal=req.files?.uploadedFile[0]?.path;
        if(!uploadedFileLocal){
            throw new ApiError(
                400,
                "uploadedFile field is requird"
            )
        }
        const uploadeFile=await uploadToAzureBlob(uploadedFileLocal)
        if(!uploadeFile){
            throw new ApiError(500,"file upload error in blob")
        }
        const uploadDetails={
            FileName:uploadedFileLocal,
            CreatedBy:createdBy,
            Status:0
        }
        const params=[
            {name:"jsonData",type:"NVarChar",length:4000,value:JSON.stringify(uploadDetails)}
        ]
        await commonSpCall.executeApplicationSchemaSp("SpInsertProjectResourceFile",params)
    
        return res.status(200).json(
            new ApiResponse(200,{uploadeFile},"success")
        )
    } catch (error) {
        throw new ApiError(
            500,
            error.message
        )
    }

})

module.exports={uploadProjectResourceInformation}