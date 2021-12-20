const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const usuarioSchema = new Schema({
   nombre: { type: String },
   email: { type: String },
   password: { type: String }, 
});


module.exports = mongoose.models.usuarios || model('usuarios', usuarioSchema); 
