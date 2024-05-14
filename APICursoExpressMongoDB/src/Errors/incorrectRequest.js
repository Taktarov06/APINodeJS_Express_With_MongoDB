import baseError from "./baseError.js";

class IncorrectRequest extends baseError {
    constructor(message = "Dados da requisição incorretos") {
        super(message, 400);
    }
}

export default IncorrectRequest;