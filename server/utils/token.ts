import jwt from "jsonwebtoken";


export class Token {
  static createAccessToken(userId: number): string {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });

    return accessToken;
  }

  static createRefreshToken(userId: number): string {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return refreshToken;
  }
}
