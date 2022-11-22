const fs = require('fs');
const child_process = require("child_process");

const jsConfig = './.graphqlconfig.javascript.yml';
const tsConfig = './.graphqlconfig.typescript.yml';
const activeConfig = './.graphqlconfig.yml';

// Javascript codegen
fs.copyFile(jsConfig, activeConfig, (err) => {
  if(err) {
    console.error(`Error copying ${jsConfig} to ${activeConfig}`, err);
    process.exit();
  }

  console.log(`Copied ${jsConfig} to ${activeConfig}`);
  console.log(`Running javascript codegen...`);
  console.log(child_process.execSync('amplify codegen'));

  // Typescript codegen
  fs.copyFile(tsConfig, activeConfig, (err) => {
    if(err) {
      console.error(`Error copying ${tsConfig} to ${activeConfig}`, err);
      process.exit();
    }

    console.log(`Copied ${tsConfig} to ${activeConfig}`);
    console.log(`Running typescript codegen...`);
    console.log(child_process.execSync('amplify codegen'));

    console.log('Done');
  });
});

