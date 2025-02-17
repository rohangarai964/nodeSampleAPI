const sql=require('mssql');

const config={
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:'pmoportal',
    port:3050,
    server:process.env.DB_SERVER,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt:true,
        trustServerCertificate:true
    }

}

const pool=new sql.ConnectionPool(config)
const close=pool.close()
const poolConnect=pool.connect().then(pool=>{
    console.log("connect");
    
    return pool
}).catch(e=>console.log("connection to database error",e))

module.exports={
    pool,close,poolConnect,sql
}