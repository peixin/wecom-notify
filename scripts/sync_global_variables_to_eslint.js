const fs = require("fs");
const globalsVars = require("../globals-vars.js");

const varNameTypeMap = { "TENCENT": "KVNamespace" };

const defineVarCode = varName => {
  const type = varNameTypeMap[varName];

  return `  const ${varName}: ${type || "string"};`;
};

const template = `export {};

declare global {
${globalsVars.map(varName => defineVarCode(varName)).join("\n")}
}
`;

console.log(template);
fs.writeFileSync("./src/bindings.d.ts", template);
