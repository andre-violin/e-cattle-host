import CryptoJS from 'crypto-js'

const keyValue = import.meta.env.VITE_CRYPTO_SECRET_KEY
const ivKey = import.meta.env.VITE_CRYPTO_IV_KEY

export function encrypteData(data) {
  if (data) {
    const key = CryptoJS.PBKDF2(keyValue, 'salt', {
      keySize: 256 / 32,
      iterations: 100
    })
    const iv = CryptoJS.enc.Utf8.parse(ivKey)
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC
    })
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex)
  }
}

export function decrypteData(data) {
  if (data) {
    const key = CryptoJS.PBKDF2(keyValue, 'salt', {
      keySize: 256 / 32,
      iterations: 100
    })
    const iv = CryptoJS.enc.Utf8.parse(ivKey)
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(data) },
      key,
      { iv, mode: CryptoJS.mode.CBC }
    )
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
