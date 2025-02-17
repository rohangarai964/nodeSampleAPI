const { getProjectSearch,defaultProjectBasedOnUserRole } = require("./projectSearch.controller")
const { getResourceRequisition, insertUpdateResourceRequisitions } = require("./resourceRequisition.controller")
const {login,refreshAccessToken}=require("./users")

module.exports={
    login,
    refreshAccessToken,
    getProjectSearch,
    defaultProjectBasedOnUserRole,
    getResourceRequisition,
    insertUpdateResourceRequisitions
}