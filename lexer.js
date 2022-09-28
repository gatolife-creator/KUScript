/**
 *
 * @param {string} source
 */
export const lexer = (source) => {
  //正規表現を使い、"文字列" or print or セミコロン or 改行で分割。
  //丸カッコで囲まれると残り、囲まれていないと捨てられる
  let tokens = source.split(/(;|".*"|print)|\n/);

  //splitの仕様上、undefinedや''などが残るので、不要なものは捨てる
  tokens = tokens.filter((a) => a);

  return tokens;
};
