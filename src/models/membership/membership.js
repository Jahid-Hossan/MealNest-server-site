const { Schema, default: mongoose, model } = require('mongoose');


const membershipSchema = new Schema({});


const memberships = model("memberships", membershipSchema);

module.exports = memberships;