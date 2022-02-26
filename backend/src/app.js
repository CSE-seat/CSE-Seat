/*
    CSE-Seat project
    18 배찬우
    18 최윤석
*/
const path = require('path')
const alias = require('better-module-alias')(path.join(__dirname,'/..'));  // $ == backend/src
const express = require('express');
const app = express();
const loaders = require('./loaders');

async function startServer() {
    loaders({expressApp:app});    
    app.listen(3000, function(){
        console.log("start!! express server on port 3000");
    });
}

startServer();