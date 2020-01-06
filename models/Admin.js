const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSuperAdmin:{
        type: Boolean,
        required: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    status: {
        type: String
    }

});


const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;