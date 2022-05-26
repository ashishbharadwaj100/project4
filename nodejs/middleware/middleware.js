var jwt = require('jsonwebtoken')

var isUserAuth = function (req, res, next) {
    
    const header = req.headers.autorization;
     console.log(header);
     
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        console.log(req.token + "token");
         
        jwt.verify(req.token, 'secretKey', (err, token) => {
            if (err) {
             res.sendStatus(403);
               
            } else {
                next();
               
                  
                }
            }
        
        )
    }
}

    module.exports = isUserAuth ;
