/**
 * Get Error Message function
 * 
 * @param error the error message
 * @returns error.message or error
 */
export const getErrorMessage = (error: unknown): string => {
    if(error instanceof Error){
        return error.message;
    }
    return String(error);
};

/**
 * Get Error Code function
 * 
 * @param error the error code
 * @returns firebaseError.code | UNKNOWN_ERROR
 */
export const getErrorCode = (error: unknown): string => {
    if(error instanceof Error){
        const firebaseError = error as any;
        return firebaseError.code || "UNKNOWN_ERROR";
    }
    return "UNKNOWN_ERROR";
};