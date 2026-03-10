import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/expressTypes";

/**
 * Middleware to check if a user is authorized based on their role or UID.
 * Now integrated with centralized error handling system.
 *
 * This middleware:
 * - Checks if the user has required roles
 * - Optionally allows users to access their own resources
 * - Throws standardized AuthorizationError for access denied scenarios
 *
 * @param {AuthorizationOptions} opts - The authorization options.
 * @returns {MiddlewareFunction} The middleware function.
 */
const isAuthorized = (opts: AuthorizationOptions): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { role, uid } = res.locals;

      // Optional: allow users to access their own resource
      if (opts.allowSameUser) {
        const resourceUserId = req.params.uid || req.params.userId;

        if (resourceUserId && resourceUserId === uid) {
          return next();
        }
      }

      // No role found in token → Forbidden
      if (!role) {
        throw new AuthorizationError(
          "Forbidden: No role found",
          "ROLE_NOT_FOUND"
        );
      }

      // Role not in allowed list → Forbidden
      if (!opts.hasRole.includes(role)) {
        throw new AuthorizationError(
          "Forbidden: Insufficient role",
          "INSUFFICIENT_ROLE"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default isAuthorized;