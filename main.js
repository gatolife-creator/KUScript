import { lexer } from "./lexer.js";
import { parser } from "./parser.js";

const code =
    `print("hello world");`;

// 字句解析
const tokens = lexer(code);
console.log("tokens = ", tokens);
// show("tokens = ", tokens);


// 構文解析をしながら実行
parser(tokens);