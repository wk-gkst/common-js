import {describe, expect, test} from '@jest/globals';
import {  desDecrypt, desEncrypt, generateRandomPassword } from '../lib/crypto';

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