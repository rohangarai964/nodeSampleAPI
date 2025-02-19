const express= require('express');
// const cors2=require('cors')

const router=express.Router();

const {
    login,
    refreshAccessToken,
    getProjectSearch,
    defaultProjectBasedOnUserRole,
    getResourceRequisition,
    insertUpdateResourceRequisitions,
    deleteResourceRequisition,
    uploadProjectResourceInformation
    
}=require("../controllers/index");
const jwtVerify = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

router.post('/v1/auth/login',login);
router.post('/v1/auth/refresh-token',refreshAccessToken)


//secured routes
router.use(jwtVerify)
router.post('/v1/project/getProjectSearch',getProjectSearch)
router.post('/v1/project/getDefaultProjectSearch',defaultProjectBasedOnUserRole)
router.route('/v1/resource/resourceRequisitions').get(getResourceRequisition).post(insertUpdateResourceRequisitions)
router.route('/v1/resource/resourceRequisition/:requisitionId').delete(deleteResourceRequisition)
router.route('/v1/projectResource/uploadProjectResourceInformation').post(upload.fields([{name:"uploadedFile",maxCount:1}]),uploadProjectResourceInformation)


module.exports=router