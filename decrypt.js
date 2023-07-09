const fs = require("fs");
const crypto = require("crypto");

function decryptText(text, encryption_key, initialization_vector) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryption_key),
    Buffer.from(initialization_vector)
  );
  let dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

function decryptFile(
  inputFile,
  outputFile,
  encryption_key,
  initialization_vector
) {
  const inputText = fs.readFileSync(inputFile, "utf8");

  const cipher = decryptText(inputText, encryption_key, initialization_vector);

  fs.writeFileSync(outputFile, cipher);
}

async function decrypt(encryption_key, initialization_vector) {
  const defaultEncryptFileName = "input-encrypt.txt";
  const defaultDecryptFileName = "upar_decrypt.txt";

  decryptFile(
    defaultEncryptFileName,
    defaultDecryptFileName,
    encryption_key,
    initialization_vector
  );
}


module.exports = decrypt;