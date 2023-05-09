import jwt from 'jsonwebtoken';


export const tokenAuth = (token) => {

    const result = jwt.verify(token, process.env.secretkey, (err, authData)=> {
        if(err){
            return false;
        }else {
        
            return true;
        }
    })

    return result;
}