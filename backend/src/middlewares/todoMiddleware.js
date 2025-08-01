const todoMiddleware = (req,res,next) => {
    if(!req.body) return res.status(400).send({message: 'body is required'});
    
    const errors = {}
    const handlers = {
        title: {
            message: 'invalid title',
            valid: (param) => typeof param === 'string' && param.length >= 5
        }
    };
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
module.exports = todoMiddleware;

