export function verifyToken(req, res, next){

    const token = req.headers["authorization"];
    checkingToken(token, req, res, next)     
}

// function to check for token

function checkingToken(token, req, res, next) {

    if(typeof token !== "undefined"){  
        req.token = token;
        next();
    }else {
        res.status(403).json({message: "You are not authorised"});
    } 
}