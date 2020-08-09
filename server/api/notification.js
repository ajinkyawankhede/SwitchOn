const User = require('../db/user')
const Notification = require('../db/notification')
var io = require('socket.io')
const SocketIO = require('../app')
const user = require('../db/user')



module.exports.approvalNotification = (req, res) => {
    User.findById(req.body.user).exec((err, user) => {
        if (err) {
            console.log(err)
        } else {
            var notification = new Notification({
                user: req.body.user,
                message: "You have a new Approval request",
            })

            notification.save(notification, (err, svdNotification) => {
                if (err) {
                    console.log(err)
                } else {
                    SocketIO.emit('approvalNotfication', {
                        user: req.body.user
                    })
                }
            })
        }
    })
}

module.exports.acceptedNotification = (req, res) => {
    User.findById(req.body.user).exec((err, user) => {
        if (err) {
            console.log(err)
        } else {
            var notification = new Notification({
                user: req.body.user,
                message: "You request was accepted.",
            })

            notification.save(notification, (err, svdNotification) => {
                if (err) {
                    console.log(err)
                } else {
                    SocketIO.emit('acceptedNotification', {
                        user: req.body.user
                    })
                }
            })
        }
    })
}

module.exports.rejectedNotification = (req, res) => {
    User.findById(req.body.user).exec((err, user) => {
        if (err) {
            console.log(err)
        } else {
            var notification = new Notification({
                user: req.body.user,
                message: "You request was rejected.",
            })

            notification.save(notification, (err, svdNotification) => {
                if (err) {
                    console.log(err)
                } else {
                    SocketIO.emit('rejectedNotification', {
                        user: req.body.user
                    })
                }
            })
        }
    })
}

module.exports.countNotifications = (req, res) => {
    Notification.find({
        $and: [{
            user: req.user._id
        }, {
            status: "Unread"
        }]
    }).exec((err, count) => {
        if (err) {
            return res.json({
                s: false,
                m: "Tech Error"
            })
        } else {
            return res.json({
                s: true,
                m: "User Notifications Count",
                d: count.length
            })
        }
    })
}

module.exports.getNotifications = (req, res) => {
    console.log(req.user)
    Notification.find({
        user: req.user._id
    }).exec((err, notifications) => {
        if (err) {
            console.log(err)
        } else {
            return res.json({
                s: true,
                m: "Notifications",
                d: notifications
            })
        }
    })
}

module.exports.markRead = (req, res) => {
    Notification.find({
        user: req.user._id
    }).exec((err, user) => {
        if (err) {
            console.log(err)
        } else {
            for (var i in user) {
                user[i].status = "Read"
                user[i].save(user[i])
            }
            if (err) {
                return res.json({
                    s: false,
                    m: "Tech Error"
                })
            } else {
                return res.json({
                    s: true,
                    m: "Marked as Read"
                })
            }
        }
    })
}