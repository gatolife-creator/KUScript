import { expect, accept, show, error } from "./utils.js";

let tokens;

export const parser = (t) => {
  tokens = t;
  return semi();
};

// その他は値としてそのまま返す
export const value = () => {
  if (tokens.length === 0) {
    return;
  }
  return tokens.shift();
};

// 関数呼び出し
export const funcCall = () => {
  // 関数名を取得
  let left = value();

  // 関数呼び出しのカッコ
  let op;
  while ((op = accept(tokens, "("))) {
    // ここはvalueではなく、semiであることに注意
    // カッコの中は心機一転、新しい構文解析を始める
    const right = semi();

    // 閉じカッコであることを確認して取得
    op += expect(tokens, ")");

    // 新しいノードを作成し階層を深める
    left = { left, op, right };
  }
  return left;
};

// セミコロン
export const semi = () => {
  // print文
  let left = funcCall();

  // セミコロンが来たら次のprint文があるかも
  let op;
  while ((op = accept(tokens, ";"))) {
    // 右辺を取得
    const right = funcCall();

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
