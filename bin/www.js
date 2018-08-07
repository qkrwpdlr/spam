var app = require("../index.js")
const morgan = require("morgan")
const dbsync = require('./sync-db')
dbsync().then(_=>{
    app.use(morgan('dev'));
    app.listen(3000,()=>{
    console.log("server is running");
    })    
});
