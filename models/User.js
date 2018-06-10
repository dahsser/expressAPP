const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear el esquema
const UserSchema = new Schema({
  nombres:{
    type: String,
    required: true,
  },
  apellidos:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', UserSchema);