import * as crypto from "crypto";

export const md5 = (value: string, isBase64 = false) => {
  const hash = crypto.createHash("md5").update(value);
  return isBase64 ? hash.digest("base64") : hash.digest("hex");
};

export const sha256 = (value: string, isBase64 = false) => {
  const hash = crypto.createHash("sha256").update(value);
  return isBase64 ? hash.digest("base64") : hash.digest("hex");
};

export const hmacSha256 = (value: string, secret: string) => {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
};

export const encryptText = (
  text: string,
  iv: string,
  secret: string,
  algorithm: "aes-128-cbc" | "aes-256-cbc",
): string => {
  const cryptoIv = iv ? Buffer.from(iv, "hex") : crypto.randomBytes(16);
  const cryptoKey = crypto.createCipheriv(
    algorithm,
    createSecretKeyBytes(secret),
    cryptoIv,
  );
  let encrypted = cryptoKey.update(text, "utf8", "base64");
  encrypted += cryptoKey.final("base64");
  return algorithm + ":" + cryptoIv.toString("hex") + ":" + encrypted;
};

export const decryptText = (text: string, secret: string): string => {
  const textParts = text.split(":");
  const algorithm = textParts.shift();
  const iv = Buffer.from(textParts.shift(), "hex");
  const cryptoKey = crypto.createDecipheriv(
    algorithm,
    createSecretKeyBytes(secret),
    iv,
    null,
  );
  const encryptedText = textParts.join(":");
  let decrypted = cryptoKey.update(encryptedText, "base64", "utf8");
  decrypted += cryptoKey.final("utf8");
  return decrypted;
};

const createSecretKeyBytes = (password: string): Buffer => {
  return crypto.pbkdf2Sync(
    Buffer.from(password),
    Buffer.from(password),
    65536,
    16,
    "sha1",
  );
};

export const desEncrypt = (
  text: string,
  secret: string | Buffer,
  algorithm = "des-ecb",
): string => {
  const secretBuffer =
    typeof secret === "string" ? Buffer.from(secret) : secret;
  const cipher = crypto.createCipheriv(
    algorithm,
    secretBuffer.slice(0, 8),
    null,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const desDecrypt = (
  encrypted: string,
  secret: string | Buffer,
  algorithm = "des-ecb",
): string => {
  const secretBuffer =
    typeof secret === "string" ? Buffer.from(secret) : secret;
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretBuffer.slice(0, 8),
    null,
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const generateRandomPassword = (
  length: number,
  number = true,
  upperCase = true,
  lowerCase = true,
  symbol = false,
): string => {
  const numberChars = "0123456789";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbolChars = "!@#$%^&*()_+";

  let characters = "";
  if (number) {
    characters += numberChars;
  }

  if (upperCase) {
    characters += upperCaseChars;
  }

  if (lowerCase) {
    characters += lowerCaseChars;
  }

  if (symbol) {
    characters += symbolChars;
  }

  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
