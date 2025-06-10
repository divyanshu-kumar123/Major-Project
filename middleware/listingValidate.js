const {listingSchema} = require('../joiSchema.js');
const expressError = require('../utils/expressError');

const listingValidate = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMess = error.details.map((el)=>el.message).join(",");
        throw new expressError(400, errMess)
    }else{
        next();
    }
}

module.exports =  listingValidate;