const readline = require("readline");
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");

function getInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

async function main() {
  const encryption_key = await getInput("Enter encryption key 32 characters: "); // Must be 32 characters
  const initialization_vector = await getInput(
    "Enter initialization vector 16 characters: "
  ); // Must be 16 characters

  const operation = await getInput(`
        Press 1: for Encrypt
        Press 2: for Decrypt
    `);

  switch (operation) {
    case "1":
      encrypt(encryption_key, initialization_vector);
      break;
    case "2":
      decrypt(encryption_key, initialization_vector);
      break;
  }
}

main();
