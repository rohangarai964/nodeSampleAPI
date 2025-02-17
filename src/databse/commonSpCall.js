const { pool, NVarChar } = require('mssql');
const asyncHandler=require('../utils/asyncHandler')
const db=require('./dbconnection')
const ApiError=require('../utils/ApiError')

const commonSpCall={
    
    async executeApplicationSchemaSp(spName,params=[]){
        await db.poolConnect;
        try{
            const request=db.pool.request();
            params.forEach( param=>{
                const type=inputType(param.type)
                request.input(param.name,type,param.value)
            })
            const result=await request.execute("[application].["+spName+"]")
            return result.recordset
        }catch(err){
             throw new ApiError(500, err.message)
        }
    },
   
};


function inputType(type,length){
    switch(type){
        case "Int":
            return db.sql.Int()
        case 'NVarChar':   
            return db.sql.NVarChar(length) 
        default:
            return db.sql.NVarChar(255)
    }
}
module.exports=commonSpCall