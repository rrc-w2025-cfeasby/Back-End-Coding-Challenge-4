import authenticate from "../src/api/v1/middleware/authenticate";
import { AuthenticationError } from "../src/api/v1/errors/errors";
import { auth } from "../config/firebaseConfig";

jest.mock("../config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() }
}));

describe("authenticate middleware", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { headers: {} };
    res = { locals: {} };
    next = jest.fn();
  });

  // 1. TOKEN_NOT_FOUND
  test("returns 401 with TOKEN_NOT_FOUND when no Authorization header", async () => {
    // Arrange
    req.headers.authorization = undefined;

    // Act
    await authenticate(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND")
    );
  });

  // 2. TOKEN_INVALID
  test("returns 401 with TOKEN_INVALID when token verification fails", async () => {
    // Arrange
    req.headers.authorization = "Bearer invalidtoken";
    (auth.verifyIdToken as jest.Mock).mockRejectedValue(new Error("Invalid token"));

    // Act
    await authenticate(req, res, next);

    // Assert
    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(Error);
  });

  // 3. Stores uid in res.locals
  test("stores uid in res.locals when token is valid", async () => {
    // Arrange
    req.headers.authorization = "Bearer validtoken";
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "123",
      role: "admin",
      email: "test@example.com"
    });

    // Act
    await authenticate(req, res, next);

    // Assert
    expect(res.locals.uid).toBe("123");
    expect(next).toHaveBeenCalled();
  });

  // 4. Stores role in res.locals
  test("stores role in res.locals when token is valid", async () => {
    // Arrange
    req.headers.authorization = "Bearer validtoken";
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "123",
      role: "admin",
      email: "test@example.com"
    });

    // Act
    await authenticate(req, res, next);

    // Assert
    expect(res.locals.role).toBe("admin");
    expect(next).toHaveBeenCalled();
  });
});