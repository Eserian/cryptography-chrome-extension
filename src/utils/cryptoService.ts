export default class CryptoService {
  static generateSecret(length = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return result.join('');
  }

  static async encryptSecret(secret: string, password: string): Promise<string> {
    const encoder = new TextEncoder();
    const encodedSecret = encoder.encode(secret);
    const encodedPassword = encoder.encode(password);

    const passwordKey = await crypto.subtle.importKey(
      'raw',
      encodedPassword,
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedSecret = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encodedSecret
    );

    const encryptedData = new Uint8Array([
      ...salt,
      ...iv,
      ...new Uint8Array(encryptedSecret),
    ]);

    return btoa(String.fromCharCode(...encryptedData));
  }

  static async decryptSecret(encryptedSecret: string, password: string): Promise<string> {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const encryptedData = Uint8Array.from(atob(encryptedSecret), (c) => c.charCodeAt(0));
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 28);
    const data = encryptedData.slice(28);

    const encodedPassword = encoder.encode(password);

    const passwordKey = await crypto.subtle.importKey(
      'raw',
      encodedPassword,
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    const decryptedSecret = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    return decoder.decode(decryptedSecret);
  }

  static async hashPassword(password: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return await crypto.subtle.digest('SHA-256', data);
  }

  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    const byteString = String.fromCharCode.apply(null, byteArray as unknown as number[]);
    return btoa(byteString);
  }

  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const byteString = atob(base64);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray.buffer;
  }
}
