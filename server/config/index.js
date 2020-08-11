
const db = 'forms';
const IP = 'localhost'
const uri = 'mongodb+srv://switchon:switchOn123@cluster0.rfvtn.mongodb.net/test?retryWrites=true&w=majority'

const config = {
    production: {
        port: (process.env.PORT || 8800),
        socketPort: 4135,
        timezone: "Asia/Kolkata",
        toTime: "23:59:59.999",
        fromTime: "00:00:00.000",
        db: db,
        IP: IP,
        database: uri
    },
    default: {
        port: (process.env.PORT || 8800),
        socketPort: 4135,
        timezone: "Asia/Kolkata",
        toTime: "23:59:59.999",
        fromTime: "00:00:00.000",
        db: db,
        IP: IP,
        database: uri
    },

}


exports.get = function get(env) {
    return config[env] || config.default;
}