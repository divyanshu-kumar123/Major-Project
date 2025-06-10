const {reviewSchema} = require('../joiSchema.js');
const expressError = require('../utils/expressError');

const reviewValidate = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMess = error.details.map((el)=>el.message).join(",");
        throw new expressError(400, errMess)
    }else{
        next();
    }
}

module.exports =  reviewValidate;