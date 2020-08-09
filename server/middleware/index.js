"use strict";


const jwt = require('jsonwebtoken')
const DB = require('../db/user')

module.exports.user = (req, res, next) => {
    var token = req.headers.token
    jwt.verify(token, 'forms', (err, auth) => {
        if (err) {
            return res.send({
                s: false,
                m: "Unauthenticated!"
            })
        } else {
            DB.findOne({
                email: auth.email
            }).then((user) => {
                if (!user) {
                    return res.send({
                        s: false,
                        m: "Unauthenticated!"
                    })
                } else {
                    req.user = user;
                    return next()
                
                }
            }).catch((error) => {
                return res.send({
                    s: false,
                    m: error
                })
            })
        }
    })
}