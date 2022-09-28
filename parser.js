import { expect, accept, show, error } from "./utils.js";

let tokens;

export const parser = (t) => {
  tokens = t;
  return semi();
};

// セミコロン
export const semi = () => {
  // print文
  let left = callPrint();

  // セミコロンが来たら次のprint文があるかも
  let op;
  while ((op = accept(tokens, ";"))) {
    // 次のprint文
    const right = callPrint();

    // 新しいノードを作成し、次にleftに入れることで、階層を作っていく
    left = { left, op, right };
  }
  return left;
};

// print関数呼び出しの構文解析
export const callPrint = () => {
  if (tokens.length === 0) {
    return;
  }

  // 関数名がprintであること
  const left = expect(tokens, "print");

  // 関数呼び出しの丸カッコであること
  let op = expect(tokens, "(");

  // 文字列を取得
  const right = tokens.shift();

  // 閉じカッコであること
  op += expect(tokens, ")");

  // 新しいオブジェクト（tree構造でのノード）
  return { left, op, right };
};
