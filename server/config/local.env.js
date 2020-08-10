
const uri = 'mongodb+srv://switchon:<password>@cluster0.rfvtn.mongodb.net/test?retryWrites=true&w=majority'
module.exports = {

    secrets: {
        session: "forms",
        expiresIn: 2629746000
    },

    db:{
        URI: uri
    }
}