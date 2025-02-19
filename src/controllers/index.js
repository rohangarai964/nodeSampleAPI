const { uploadProjectResourceInformation } = require("./projectResource")
const { getProjectSearch,defaultProjectBasedOnUserRole } = require("./projectSearch.controller")
const { getResourceRequisition, insertUpdateResourceRequisitions, deleteResourceRequisition } = require("./resourceRequisition.controller")
const {login,refreshAccessToken}=require("./users")

module.exports={
    login,
    refreshAccessToken,
    getProjectSearch,
    defaultProjectBasedOnUserRole,
    getResourceRequisition,
    insertUpdateResourceRequisitions,
    deleteResourceRequisition,
    uploadProjectResourceInformation
}