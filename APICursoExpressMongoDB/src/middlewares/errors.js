import mongoose from "mongoose";
import BaseError from "../Errors/baseError.js";
import IncorrectRequest from "../Errors/incorrectRequest.js";
import ValidationError from "../Errors/validationError.js";




// eslint-disable-next-line no-unused-vars
function errorManipulator(e, req, res, next) {
  if (e instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendAnswer(res);
  } else if (e instanceof mongoose.Error.ValidationError) {
    new ValidationError(e).sendAnswer(res);
  } else if (e instanceof BaseError) {
    e.sendAnswer(res);
  } else {
    new BaseError().sendAnswer(res);
  }
}

export default errorManipulator;