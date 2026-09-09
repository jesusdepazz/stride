import "server-only";
import crypto from "crypto";

export const SESSION_COOKIE = "stride_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "stride-demo-secret-change-me";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** token = "<expiryEpochSeconds>.<hmac>" */
export function createSessionToken(): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(signature);
  if (expectedBuf.length !== signatureBuf.length) return false;
  if (!crypto.timingSafeEqual(expectedBuf, signatureBuf)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now() / 1000;
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "stride2026";
  return password === expected;
}

export const SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;
