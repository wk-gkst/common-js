import * as crypto from "crypto";

export const md5 = (value: string, isBase64 = false) => {
  const hash = crypto.createHash("md5").update(value);
  return isBase64 ? hash.digest("base64") : hash.digest("hex");
};

export const sha256 = (value: string, isBase64 = false) => {
  const hash = crypto.createHash("sha256").update(value)
  return isBase64 ? hash.digest("base64") : hash.digest("hex");
};

export const hmacSha256 = (value: string, secret: string) => {
  return crypto
    .createHmac("sha256", secret)
    .update("I love cupcakes")
    .digest("hex");
};
