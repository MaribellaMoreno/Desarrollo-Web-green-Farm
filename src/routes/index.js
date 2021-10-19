const express = require('express');
const bcryptjs = require('bcryptjs');
const connection = require('../datbase/db');
const router = express.Router();
const calcular = require('../calcular/calcular');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const cookieParser = require('cookie-parser');
const { Console } = require('console');

//const authcontroller = require('../controller/authcontroller')
router.get("/catalogo.html", (req, res) => {
    res.render("catalogo.html");
});

router.get('/', /*isAuthenticateduser,*/(req, res) => {
    res.render('index.html', { user: req.user });
});

router.get("/login.html", (req, res) => {
    res.render("login.html");
});
router.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if (user && pass) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                res.render('login.html', {
                    alert: true,
                    alertTitle: "Oops...",
                    alertMessage: "¡USUARIO O PASSWORD INCORRECTO!",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    ruta: 'login.html'
                })
            } else {
                const id = results[0].idusers;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA

                });
                console.log(token)
                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions)
                res.render('login.html', {
                    alert: true,
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
});

async function isAuthenticated(req, res, next) {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            connection.query('SELECT * FROM users WHERE idusers = ?', [decodificada.id], (error, results) => {
                if (decodificada.id != 33) { res.render('login.html') }
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/')

    }
};
async function isAuthenticateduser(req, res, next) {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            connection.query('SELECT * FROM users WHERE idusers = ?', [decodificada.id], (error, results) => {
                if (!results) { res.render('/') }
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }

    } else {
        res.redirect('login.html')

    }

};

router.get('/logout', (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
});
router.get('/admin/logout', (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
});


router.get("/registro.html", (req, res) => {
    res.render("registro.html");
});
router.post('/registro.html', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const direccion = req.body.direccion;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if (user && pass) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if (results.length == 0) {

                connection.query('INSERT INTO users SET ?', { user: user, apellido: apellido, email: email, dirección: direccion, password: passwordHaash }, async (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        res.render('registro.html', {
                            alert: true,
                            alertTitle: "Registration",
                            alertMessage: "¡Successful Registration!",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'login.html'
                        })
                    }
                });
            } else {
                res.render('registro.html', {
                    alert: true,
                    alertTitle: "Oops...",
                    alertMessage: "¡USUARIO YA EN USO!",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    ruta: 'registro.html'
                });
            }
        });
    }
});


router.get("/contact.html", (req, res) => {
    res.render("contact.html");
});

//productos
router.get("/productos.html", (req, res) => {
    res.render("productos.html");
});
router.post('/productos.html', (req, res) => {
    const CantHeta5 = req.body.CantHetaPalma;
    const CantHeta1 = req.body.CantHetaMaiz;
    const CantHeta2 = req.body.CantHetaCafe;
    const CantHeta3 = req.body.CantHetaArroz;
    const CantHeta4 = req.body.CantHetaCacao;
    if (CantHeta5 > 0) {
        let palce = 51313100;
        res.render('productos.html', {
            alert: true,
            alertTitle: "Hecho",
            alertMessage: "¡Total!" + calcular.operacion(CantHeta5, palce),
            alertIcon: 'success',
            showConfirmButton: false,
            footer: '<a href="/pagar.html">Desea agregar al carrito?</a>',
            timer: '',
            ruta: 'productos.html'
        });
    } if (CantHeta1 > 0) {
        let palce = 3568000;
        res.render('productos.html', {
            alert: true,
            alertTitle: "Hecho",
            alertMessage: "¡Total!" + calcular.operacion(CantHeta1, palce),
            alertIcon: 'success',
            showConfirmButton: false,
            footer: '<a href="/pagar.html">Desea agregar al carrito?</a>',
            timer: '',
            ruta: 'productos.html'
        });
    } else if (CantHeta2 > 0) {
        let palce = 2226440;
        res.render('productos.html', {
            alert: true,
            alertTitle: "Hecho",
            alertMessage: "¡Total!" + calcular.operacion(CantHeta2, palce),
            alertIcon: 'success',
            showConfirmButton: false,
            footer: '<a href="/pagar.html">Desea agregar al carrito?</a>',
            timer: '',
            ruta: 'productos.html'
        });
    } else if (CantHeta3 > 0) {
        let palce = 1275950;
        res.render('productos.html', {
            alert: true,
            alertTitle: "Hecho",
            alertMessage: "¡Total!" + calcular.operacion(CantHeta3, palce),
            alertIcon: 'success',
            showConfirmButton: false,
            footer: '<a href="/pagar.html">Desea agregar al carrito?</a>',
            timer: '',
            ruta: 'productos.html'
        });
    } else if (CantHeta4 > 0) {
        let palce = 1144400;
        res.render('productos.html', {
            alert: true,
            alertTitle: "Hecho",
            alertMessage: "¡Total!" + calcular.operacion(CantHeta4, palce),
            alertIcon: 'success',
            showConfirmButton: false,
            footer: '<a href="/pagar.html">Desea agregar al carrito?</a>',
            timer: '',
            ruta: 'productos.html'
        });
    } else {
        console.log('bobo hp')
    }
});

//cart
router.get("/pagar.html", isAuthenticateduser, (req, res) => {
    res.render("pagar.html");
});

//admin
router.get("/administrador.html", isAuthenticated, (req, res) => {
    connection.query('SELECT * FROM productos', (error, filas) => {
        console.log(filas);
        if (error) {
            throw error;
        } else {
            res.render('administrador.html', { filas: filas });
        }
    });
});

//administrador-actualizar productos
router.get('/admin/actualizar.html/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM productos WHERE id= ?', [id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            res.render('admin/actualizar.html', { row: fila[0] });
        }
    });
    //res.render('/administrador/actualizar.html');
});

//administrador-agregar productos
router.get('/admin/agregarProduct.html', (req, res) => {
    res.render('admin/agregarProduct.html');
})


//administrador usuarios
router.get("/admin/user.html", isAuthenticated, (req, res) => {
    connection.query('SELECT * FROM users', (error, user) => {
        console.log(user);
        if (error) {
            throw error;
        } else {
            res.render('admin/user.html', { user: user });
        }
    });

});

//mostrar lista
router.get('/api/articulos', (req, res) => {
    connection.query('SELECT * FROM users', (error, filas) => {
        //console.log(filas);
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

//mostrar un solo articulo de la db
router.get('/api/articulos/:id', (req, res) => {
    connection.query('SELECT * FROM productos WHERE id= ?', [req.params.id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            res.send(fila);
        }
    });
});

//insertar un articulo
router.post('/api/articulos', (req, res) => {
    let data = { PRODUCTO: req.body.producto, DESCRIPCION: req.body.descripcion, STOCK: req.body.stock, PRECIO: req.body.precio };
    console.log(data.PRODUCTO);
    if (data.PRODUCTO && data.DESCRIPCION && data.STOCK && data.PRECIO) {
        let sql = "INSERT INTO productos SET ?";
        connection.query(sql, data, function (error, results) {
            if (error) {
                throw error;
            } else {
                res.redirect('/administrador.html');
            }
        });
    } else {
        res.redirect('/administrador.html');
    }

});

//editar articulos
router.post('/api/articulos/:id', (req, res) => {
    let PRODUCTO = req.body.producto;
    let DESCRIPCION = req.body.descripcion;
    let STOCK = req.body.stock;
    let PRECIO = req.body.precio;
    let id = req.body.id;
    connection.query('UPDATE productos SET ? WHERE id= ?', [{ PRODUCTO: PRODUCTO, DESCRIPCION: DESCRIPCION, STOCK: STOCK, PRECIO: PRECIO }, id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/administrador.html');
        }
    });
});

//elinar articulos
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM productos WHERE id= ?', [id], (error, rows) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/administrador.html');
        }
    });
});



module.exports = router;