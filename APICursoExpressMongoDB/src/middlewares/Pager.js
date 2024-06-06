import IncorrectRequest from "../Errors/incorrectRequest.js";

async function Pager(req, res, next) {

    try {
        let { limit = 5, page = 1, ordernation = "_id:-1" } = req.query;
    
        let [nameOrdenation, order] = ordernation.split(":");
    
        limit = parseInt(limit);
        page = parseInt(page);
        order = parseInt(order);
    
        const result = req.result;
    
        if (limit > 0 && page > 0) {
            const resultList = await result.find()
                .sort({ [nameOrdenation]: order })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(); // Metodo para fazer a busca por referencia ao inves do metodo q o NoSQL usa 
            res.status(200).json(resultList);
        } else {
            next(new IncorrectRequest());
        }
    } catch (e) {
        next(e);
    }
}

export default Pager;