import jwt from 'jsonwebtoken';
import { envVariables } from './config';


export const tokenAuth = (token) => {

    const result = jwt.verify(token, envVariables.secretKey, (err, authData)=> {
        if(err){
            return false;
        }else {
        
            return true;
        }
    })

    return result;
}