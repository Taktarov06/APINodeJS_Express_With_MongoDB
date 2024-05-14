import BaseError from "./baseError.js";

class PageNotFound extends BaseError {
    constructor(message = "Pagina não encontrada") {
        super(message, 404);
    }
}

export default PageNotFound;