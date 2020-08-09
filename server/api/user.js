const User = require("../db/user");
const bcrypt = require("bcryptjs");

module.exports.signUp = (req, res) => {
    if (
        req.body.email == null ||
        req.body.email == undefined ||
        req.body.password == null ||
        req.body.password == undefined ||
        req.body.department == null ||
        req.body.department == undefined
    ) {
        return res.json({
            s: false,
            m: "Please Provide all information",
        });
    } else {
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (user) {
                res.json({
                    s: false,
                    m: "User with this email ID already exists."
                })
            } else {
                bcrypt.hash(req.body.password, 10).then(function (hash) {
                    var user = new User({
                        email: req.body.email.toLowerCase(),
                        password: hash,
                        department: req.body.department,
                    });
                    user.save(user, (err, svdUser) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({
                                s: true,
                                m: "User Saved",
                            });
                        }
                    });
                });
            }
        })
    }
};

module.exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (!user) {
            return res.send({
                s: false,
                m: "User Not Found Please Register",
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function (
                err,
                response
            ) {
                if (err) {
                    console.log(err);
                } else if (response) {
                    const token = user.generateJwt();

                    return res.send({
                        s: true,
                        m: "Login Sucessful",
                        id: user._id,
                        email: user.email,
                        usertoken: token
                    });
                } else {
                    return res.send({
                        s: false,
                        m: "Enter correct password",
                    });
                }
            });
        }
    });
};