import IncorrectRequest from "./incorrectRequest.js";

class ValidationError extends IncorrectRequest {
    constructor(e) {
        const messageError = Object.values(e.errors)
            .map(e => e.message)
            .join("; ");
        super(`Erros: ${messageError}`);
    }
}

export default ValidationError;