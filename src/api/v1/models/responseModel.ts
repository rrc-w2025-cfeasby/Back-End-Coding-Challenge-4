/**
 * Error Response function
 * 
 * @param message the message
 * @param code the code
 */
export const errorResponse = (message: string, code: string) => ({
    success: false,
    error: {
        message,
        code
    },
    timestamp: new Date().toISOString()
});

/**
 * Success Response
 * 
 */
export function successResponse(data: unknown, message: string) {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
}