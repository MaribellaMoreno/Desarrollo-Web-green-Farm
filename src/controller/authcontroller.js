/*const express = require('express');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const cookieParser = require('cookie-parser');
const connection = require('../datbase/db');*/


/*async function login (req, res){
    try {
        const user = req.body.user;
        const pass = req.body.pass;
        let passwordHaash = await bcryptjs.hash(pass, 8);
        if(user && pass){
            connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) =>{
                if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                    res.render('login.html',{
                        alert:true,
                        alertTitle: "Oops...",
                        alertMessage: "¡USUARIO O PASSWORD INCORRECTO!",
                        alertIcon: 'error',
                        showConfirmButton: false,
                        timer: 2000,
                        ruta:'login.html'
                    })
                }else{
                    const id = results[0].id;
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
                        expiresIn:process.env.JWT_TIEMPO_EXPIRA,
                        
                    });
                    
                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly:true
                    }
                    console.log(cookiesOptions)
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login.html',{
                        alert:true,
                        alertTitle: "login correcto",
                        alertMessage: "¡sesion iniciada!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: '/'
                    })    
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function isAuthenticated(req, res, next){
    if(req.cookiesOptions.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookiesOptions.jwt, process.env.JWT_SECRETO)
            connection.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
            if(!results){return next()}
            req.user = results[0]
            return next()
        })
        } catch (error) {
            console.log(error)
            return next()
        }
        
    }else{
        req.redirect('login.html')
        next()
    }
    
};

module.exports.login=login;
module.exports.isAuthenticated=isAuthenticated;*/



//module.exports.logout=logout;


