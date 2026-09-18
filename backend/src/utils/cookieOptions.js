const isProduction = process.env.NODE_ENV === "production";

// FIX (prod): `sameSite: "none"` REQUIRES `secure: true` on HTTPS.
// Locally (http://localhost) browsers need `lax` + `secure: false`.
// In production (Vercel frontend + Render backend, cross-site HTTPS)
// we need `none` + `secure: true`, plus `trust proxy` in server.js.
// Also fixes maxAge typo: was `* 100`, should be `* 1000` (2 days to match JWT).
const getCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days, matches JWT expiresIn
  path: "/",
});

// clearCookie must use same secure/sameSite/path (no maxAge)
const getClearCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
});

module.exports = { getCookieOptions, getClearCookieOptions, isProduction };
