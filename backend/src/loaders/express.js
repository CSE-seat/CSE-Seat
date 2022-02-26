const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require(path.join(__dirname , '/../api/routes'))
const cors = require('cors')


module.exports = ({app}) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors());    
    app.use(routes);
    return app;
}