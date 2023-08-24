
const BASE_LETTER = "U)bgrV]DP<jFl>ifGoBJhw8e4d'sX_#Ma;/@W(N7pL?-StH^yu:*Q,E!k&20CTx5%I9[1ZOR.K+6A{Y}cznq=$m3v`~|";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function generateLetter() {
  var letter_list = BASE_LETTER.split('');
  var list = [];
  for (let i = 0; i < process.env.DATA_LENGTH; i++) {
    var cur_list = shuffleArray(letter_list);
    list.push(cur_list.join(''));
  }
  return list;
}