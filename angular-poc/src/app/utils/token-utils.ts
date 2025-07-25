// src/app/utils/token-utils.ts

import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  exp: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const expiry = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return expiry < now;
  } catch (error) {
    return true; // Treat invalid token as expired
  }
}
