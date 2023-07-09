const fs = require("fs");
const crypto = require("crypto");

function encryptText(text, encryption_key, initialization_vector) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryption_key),
    Buffer.from(initialization_vector)
  );
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function encryptFile(
  inputFile,
  outputFile,
  encryption_key,
  initialization_vector
) {
  const inputText = fs.readFileSync(inputFile, "utf8");

  const cipher = encryptText(inputText, encryption_key, initialization_vector);

  fs.writeFileSync(outputFile, cipher);
}

async function encrypt(encryption_key, initialization_vector) {
  const defaultEncryptFileName = "input-encrypt.txt";
  const defaultInputFileName = "upar.txt";

  encryptFile(
    defaultInputFileName,
    defaultEncryptFileName,
    encryption_key,
    initialization_vector
  );
}


module.exports = encrypt;