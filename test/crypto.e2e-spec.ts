import {describe, expect, test} from '@jest/globals';
import {  computeBcrypt, computeBcryptSalt, desDecrypt, desEncrypt, generateRandomPassword, generateRSAKeyPair, isBcryptMatch } from '../lib/crypto';
import * as crypto from "crypto";

describe("Crypto Des Encryption (e2e)", () => {
  let secret = "this is a secret";
  const textToEncrypt = "this is a test for encryption 2";
  const encrypted = "c340d3dc6c50d7e15eff04e4c10c3945f8139773261e79ec39dde97846b658f7";

  it("Des Encrypt", () => {
    const encrypted = desEncrypt(textToEncrypt, secret);
    expect(encrypted).toEqual(encrypted);
  });

  it("Des Decrypt", ()=> {
    const decrypted = desDecrypt(encrypted, secret);
    expect(decrypted).toEqual(textToEncrypt);
  })
});


describe("generateRandomPassword (e2e)", () => {

  it("test generateRandomPassword with length", ()=> {
    const length = 24;
    const password = generateRandomPassword(length);
    expect(password).toHaveLength(length);
  });

});


describe("generateRSAKeyPair (e2e)", () => {

  it("test generateRSAKeyPair without password", ()=> {
     const result = generateRSAKeyPair(4096);
    expect(result.privateKey.length).toBeGreaterThan(0);
    expect(result.publicKey.length).toBeGreaterThan(0);
  });

  it("test generateRSAKeyPair with password", ()=> {
    const result = generateRSAKeyPair(4096, null, { cipher: "aes-256-cbc", passphrase: "top secret", });

    expect(result.privateKey.length).toBeGreaterThan(0);
    expect(result.publicKey.length).toBeGreaterThan(0);
   
 });  

});


describe("Bcrypt (e2e)", () => {
  const password = "this is a super strong password";
  const incorrectPassword = "this is a incorrect password";
  const salt = "$2b$10$LQH3By1T/h4Fyjt4RhSV7.";

  it("test computeBcrypt", async ()=> {
      const bcrypt1 = await computeBcrypt(password, salt);
      const bcrypt2 = await computeBcrypt(password);

      expect(await isBcryptMatch(password, bcrypt1)).toBeTruthy();
      expect(await isBcryptMatch(password, bcrypt2)).toBeTruthy();
      expect(await isBcryptMatch(incorrectPassword, bcrypt1)).toBeFalsy();
      expect(await isBcryptMatch(incorrectPassword, bcrypt2)).toBeFalsy();
  });



});