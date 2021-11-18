import jwt from "jsonwebtoken";
interface TokenUserPayload {
  email: string;
  nickname: string;
}

export class Token {
  static createAccessToken(userPayload: TokenUserPayload): string {
    const accessToken = jwt.sign({ ...userPayload }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return accessToken;
  }

  static createRefreshToken() {
    const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return refreshToken;
  }
}
