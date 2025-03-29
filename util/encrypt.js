import crypto from "crypto";
const secretKey = crypto.randomBytes(32);

const decryptPrivateKey = (encryptedKey) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, Buffer.alloc(16, 0));
    let decrypted = decipher.update(encryptedKey, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

const encryptPrivateKey = (privateKey) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, Buffer.alloc(16, 0));
    let encrypted = cipher.update(privateKey, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

export { encryptPrivateKey, decryptPrivateKey }