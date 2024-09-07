#!/usr/bin/env node

const crypto = require('crypto');

// Encryption parameters
const passphrase = process.env.PASSPHRASE;
const textToEncrypt = process.env.IMAGE_BASE64;
const algorithm = 'aes-256-gcm';
// const salt = crypto.randomBytes(16); // Generate a random salt (128-bit)
// const iv = crypto.randomBytes(12); // 96-bit IV
const salt = hexToBytes("47c3f305d0402e89528b6af8a193f332");
const ivBytes = hexToBytes("08a10aeecffe8f4df2b1ab06");
const authTag = hexToBytes("ac8456639b95543617f9714aa3e0dc2d");

const iterations = 100000; // Number of iterations for PBKDF2

// Function to derive key using PBKDF2
const deriveKey = (passphrase, salt) => {
    return crypto.pbkdf2Sync(passphrase, salt, iterations, 32, 'sha256'); // Derive a 256-bit key
};

// Function to encrypt text
const encrypt = (text, key, iv) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    return {
        encryptedText: encrypted,
        authTag: authTag.toString('hex'),
    };
};

// Encrypt the text
const key = deriveKey(passphrase, salt);
const encryptedData = encrypt(textToEncrypt, key, iv);

console.log('Encrypted Text:', encryptedData.encryptedText);
console.log('Salt:', salt.toString('hex'));
console.log('IV:', iv.toString('hex'));
console.log('Auth Tag:', encryptedData.authTag);
