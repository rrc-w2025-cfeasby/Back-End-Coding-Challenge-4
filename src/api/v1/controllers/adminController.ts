import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

export async function setCustomClaimsHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        const { uid, claims } = req.body;

        await auth.setCustomUserClaims(uid, claims);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for user: ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
    }catch(error){
        next(error);
    }
};