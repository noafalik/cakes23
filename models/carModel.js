const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema({
  id:Number,
  car:String,
  car_color:String,
  car_model_year:Number
})

exports.CarModel = mongoose.model("cars",carSchema);

exports.validateCar = (_reqBody) => {
  let joiSchema = Joi.object({
    id:Joi.number().min(1).max(999999).required(),
    car:Joi.string().min(2).max(150).required(),
    car_color:Joi.string().min(2).max(150).required(),
    car_model_year:Joi.number().min(1910).max(2100).required()
  })
  return joiSchema.validate(_reqBody);
}