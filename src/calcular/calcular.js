const express = require('express');
const CantHeta = require('../routes/index')


function operacion(CantHeta , palce){
    if(CantHeta>0){
        return CantHeta * palce;
    }else{
        return false;
    }
    
}


module.exports.operacion = operacion;