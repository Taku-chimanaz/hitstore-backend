import jwt from 'jsonwebtoken';
import {secretkey} from './secretkey.js';

export const tokenAuth = (token) => {

    const result = jwt.verify(token, secretkey, (err, authData)=> {
        if(err){
            return false;
        }else {
        
            return true;
        }
    })

    return result;
}