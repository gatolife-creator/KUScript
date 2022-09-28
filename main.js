import { lexer } from "./lexer.js";
import { parser } from "./parser.js";
import { run } from "./run.js";

const code = `
print("hello world");
print("2");
`;

// 字句解析
const tokens = lexer(code);
console.log("tokens = ", tokens);
console.log(...tokens);

// 構文解析
const ast = parser(tokens);
console.log("ast = ", ast);

// 実行
run(ast);
