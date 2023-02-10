const jwt = require('jsonwebtoken');

const secretkey = 'secretkey';
function auth(req, res, next) {
    let token 
     
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            console.log('run');
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, secretkey)
           

            req.user =  decoded
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
            
        }
    } 
}

module.exports = auth;