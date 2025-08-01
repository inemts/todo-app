const doneMiddleware = (req,res,next) => {
    const errors = {}
    if(!req.body) return res.status(400).send({message: 'body is required'});
     const handlers = {
        done: {
            message: 'invalid done field',
            valid: (param) => typeof param === 'boolean'
        }
    }
    for (const prop in req.body){
        if(!handlers[prop]){
          return res.status(400).send({message: 'body got invalid field'});  
        }
       const {message,valid} = handlers[prop];
        if(!valid(req.body[prop])){
            errors[prop] = message;
        }
    }
    if(Object.keys(errors).length){
        return res.status(400).send(errors);
    }
    return next();
}

module.exports = doneMiddleware;