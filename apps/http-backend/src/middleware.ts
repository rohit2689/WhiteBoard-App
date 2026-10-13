import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction) {
     const token = req.headers["authorization"] ?? "";
     
     const decodedToken = jwt.verify(token, JWT_SECRET);

     if(decodedToken) {
        //@ts-ignore
        req.userId = decodedToken.userId;
        next();
     }else {
        res.status(403).json({ message: "unAuthorized" });
     }

 }
