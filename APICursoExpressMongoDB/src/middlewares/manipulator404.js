import PageNotFound from "../Errors/pageNotFound.js";

function manipulator404(req, res, next) {
    const error404 = new PageNotFound();
    next(error404);
}

export default manipulator404;