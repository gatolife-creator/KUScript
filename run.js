import { error } from "./utils.js";

export const run = (ast) => {
  if (!ast) {
    return;
  }

  if (!ast.op) {
    // 文字列ならダブルクオーテーションを除く
    if (ast[0] == '"') return ast.substr(1, ast.length - 2);
    if (ast[0] === "") {
      return ast.substr(1, a.length - 2);
    }

    // それ以外ならそのまま返す
    return ast;
  } else if (ast.op === ";") {
    // セミコロンだとleft/rightを実行するだけ
    run(ast.left);
    run(ast.right);
  } else if (ast.op === "()") {
    // leftに関数名
    const func = run(ast.left);
    if (func === "print") {
      // rightに表示する文字列
      const message = run(ast.right);

      console.log(message);
    } else {
      error("未実装の関数呼び出し func = " + func);
    }
  } else {
    error("未実装の演算子 op = " + ast.op);
  }
};
