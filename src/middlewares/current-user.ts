import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string
}

// the code block below shows how we can reach into an existing 
// type definition file and make modifications to its structure.
// here we are adding a new property currentUser to the Request object
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }    
}

/*
The purpose of this middleware is to set the currentUser
parameter in the request object, which will be used by the 
requireAuth middleware to validate authentication.
The currentUser valus is gotten by decoding the jwt session object
*/
export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;
        req.currentUser = payload;
    } catch (error) {
        
    }

    next();
}
