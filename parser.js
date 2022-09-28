import { expect, accept, show, error } from "./utils.js";

let tokens;

export const parser = (t) => {
    tokens = t
    return callPrint();
}

// print関数呼び出しの構文解析
export const callPrint = () => {
    if (tokens.length === 0) {
        return;
    }

    // 関数名がprintであること
    expect(tokens, "print");

    // 関数呼び出しの丸カッコであること
    expect(tokens, "(");

    let message = tokens.shift();

    // ダブルクオーテーションを取り除く
    message = message.substr(1, message.length - 2);

    // 表示＝即実行
    console.log(message);

    // 閉じカッコであること
    expect(tokens, ")");

}