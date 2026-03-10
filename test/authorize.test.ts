import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

describe("authorize middleware", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { params: {} };
    res = { locals: {} };
    next = jest.fn();
  });

  // 1. ROLE_NOT_FOUND
  test("returns 403 with ROLE_NOT_FOUND when user has no role", () => {
    // Arrange
    res.locals.role = undefined;
    const middleware = isAuthorized({ hasRole: ["admin"] });

    // Act
    middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      new AuthorizationError("Forbidden: No role found", "ROLE_NOT_FOUND")
    );
  });

  // 2. INSUFFICIENT_ROLE
  test("returns 403 with INSUFFICIENT_ROLE when role not in allowed list", () => {
    // Arrange
    res.locals.role = "developer";
    const middleware = isAuthorized({ hasRole: ["admin"] });

    // Act
    middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      new AuthorizationError("Forbidden: Insufficient role", "INSUFFICIENT_ROLE")
    );
  });

  // 3. Calls next() when role allowed
  test("calls next() when user role is in allowed list", () => {
    // Arrange
    res.locals.role = "admin";
    const middleware = isAuthorized({ hasRole: ["admin"] });

    // Act
    middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith();
  });

  // 4. Works with multiple allowed roles
  test("works with multiple allowed roles", () => {
    // Arrange
    res.locals.role = "lead";
    const middleware = isAuthorized({ hasRole: ["admin", "lead"] });

    // Act
    middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith();
  });
});