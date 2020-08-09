const Forms = require("../db/form");
const Users = require("../db/user");
const Notification = require("../db/notification")
const axios = require('axios');
const user = require("../db/user");

module.exports.getUsers = (req, res) => {
    Users.findOne({
        email: req.user.email,
    }).exec((err, user) => {
        if (err) {
            console.log(err);
        } else if (user) {
            if (user.department[0] === "Department1") {
                Users.find({
                    department: "Department2",
                }).exec((err, users) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            s: true,
                            m: "Users found",
                            d: users,
                            dept: "Department2",
                        });
                    }
                });
            } else if (user.department[0] === "Department2") {
                Users.find({
                    department: "Department1",
                }).exec((err, users) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            s: true,
                            m: "Users found",
                            d: users,
                            dept: "Department1",
                        });
                    }
                });
            }
        }
    });
};

module.exports.saveForms = async (req, res) => {
    const form = new Forms({
        createdBy: req.user.email,
        assignedTo: req.body.assignedTo,
        message: req.body.message,
        department: req.body.department,
    });

    form.save(form, (err, svdForm) => {
        if (err) {
            console.log(err);
        } else {
            Users.findOne({
                email: req.body.assignedTo
            }).exec((err, assUser) => {
                if (err) {
                    console.log(err)
                } else {
                    axios.post(`http://localhost:8800/api/approvalNotification`, {
                        user: assUser._id
                    }, {
                        headers: {
                            Authorization: 'Bearer' + req.headers.token
                        }
                    })
                    return res.json({
                        s: true,
                        m: "Form Submitted",
                    });
                }
            })

        }
    });
};

module.exports.pendingRequests = (req, res) => {
    Users.findOne({
        _id: req.user._id,
    }).exec((err, user) => {
        if (err) {
            console.log(err);
        } else if (user) {
            if (user.department[0] === "Department1") {
                Forms.find({
                    $and: [{
                            pending: true,
                        },
                        {
                            department: "Department1",
                        },
                    ],
                }).exec((err, forms) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            s: true,
                            m: "Forms of Department 1",
                            d: forms,
                        });
                    }
                });
            } else if (user.department[0] === "Department2") {
                Forms.find({
                    $and: [{
                            pending: true,
                        },
                        {
                            department: "Department2",
                        },
                    ],
                }).exec((err, forms) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            s: true,
                            m: "Forms of Department 2",
                            d: forms,
                        });
                    }
                });
            }
        }
    });
};

module.exports.approveRequest = (req, res) => {
    console.log(req.body)
    Forms.findOne({
        _id: req.body.id,
    }).exec((err, form) => {
        if (err) {
            console.log(err);
        } else {
            console.log(form)
            form.approved = true;
            form.pending = false;
            form.save(form, (err, svdForm) => {
                if (err) {
                    console.log(err);
                } else {
                    Users.findOne({
                        email: form.createdBy
                    }).exec((err, crtdUser) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(crtdUser, "11111111111")
                            axios.post(`http://localhost:8800/api/acceptedNotification`, {
                                user: crtdUser._id
                            }, {
                                headers: {
                                    Authorization: 'Bearer' + req.headers.token
                                }
                            })
                            res.json({
                                s: true,
                                m: "Request Approved",
                                d: null,
                            });
                        }
                    })
                }
            });
        }
    });
};

module.exports.rejectRequest = (req, res) => {
    Forms.findOne({
        _id: req.body.id,
    }).exec((err, form) => {
        if (err) {
            console.log(err);
        } else {
            form.rejected = true;
            form.pending = false;
            form.save(form, (err, svdForm) => {
                if (err) {
                    console.log(err);
                } else {
                    Users.findOne({
                        email: form.createdBy
                    }).exec((err, crtdUser) => {
                        if (err) {
                            console.log(err)
                        } else {
                            axios.post(`http://localhost:8800/api/rejectedNotification`, {
                                user: crtdUser._id
                            }, {
                                headers: {
                                    Authorization: 'Bearer' + req.headers.token
                                }
                            })
                        }
                    })
                    res.json({
                        s: true,
                        m: "Request Rejected",
                        d: null,
                    });
                }
            });
        }
    });
};

module.exports.approvedForms = (req, res) => {
    Forms.find({
        $and: [{
                createdBy: req.user.email,
            },
            {
                approved: true,
            },
        ],
    }).limit(5).exec((err, forms) => {
        if (err) {
            console.log(err);
        } else {
            return res.json({
                s: true,
                m: "Approved Forms",
                d: forms,
            });
        }
    });
};

module.exports.rejectedForms = (req, res) => {
    Forms.find({
        $and: [{
                createdBy: req.user.email,
            },
            {
                rejected: true,
            },
        ],
    }).limit(5).exec((err, forms) => {
        if (err) {
            console.log(err);
        } else {
            return res.json({
                s: true,
                m: "Rejected Forms",
                d: forms,
            });
        }
    });
};