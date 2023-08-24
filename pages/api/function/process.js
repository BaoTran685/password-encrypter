import initData from "./init";

const base_letters = "qwertyuiopasdfghjklzxcvbnm[]{};:',./<>?1234567890-=!@#$%^&*()_+QWERTYUIOPASDFGHJKLZXCVBNM`~";

function randomNumber(number) {
  return Math.floor(Math.random() * number);
}
function deeperProcess(list, dict, text, number) {
  var result = '';
  var u = text.length;
  var k = list.length;
  for (let i = 0; i < u; i++) {
    var cur_char = list[(dict[text[i]] + (i + 1) + number) % k];
    result += cur_char;
  }
  return result;
}
function convert(number, base) {
  return parseInt(number.toString(base));
}
function process(list, dict, text, number, type) {
  var ls = [number, convert(number, 5)];
  var res = '';
  if (type == 0) {
    //decrypt
    ls.reverse();
    res = deSalt(text, number);
  } else {
    //encrypt
    res = text;
  }
  for (let i = 0; i < ls.length; i++) {
    res = deeperProcess(list, dict, res, ls[i]);
  }
  if (type == 0) {
    //decrypt
    return res;
  } else {
    //encrypt
    return enSalt(res, number);
  }
}
function getList(text, number, type) {
  var text_list = text.split('');
  var number_list = []
  var number_string = number.toString();
  for (let i = 0; i < number_string.length; i++) {
    var numb = parseInt(number_string[i]);
    if (number_list.includes(numb) == 0) {
      number_list.push(numb);
    }
  }
  number_list.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i < number_list.length; i++) {
    if ((type == 0 && number_list[i] + i >= text.length) || (type == 1 && number_list[i] >= text.length)) {
      number_list = number_list.slice(0, i);
      break;
    }
  }
  return { text_list, number_list }
}

function enSalt(text, number) {
  var { text_list, number_list } = getList(text, number, 1);
  for (let i = 0; i < number_list.length; i++) {
    var index = number_list[i] + i;
    var char = base_letters[randomNumber(base_letters.length)];
    text_list = [
      ...text_list.slice(0, index),
      char,
      ...text_list.slice(index)
    ]
  }
  return text_list.join('');
}
function deSalt(text, number) {
  var { text_list, number_list } = getList(text, number, 0);
  for (let i = 0; i < number_list.length; i++) {
    var index = number_list[i];
    text_list.splice(index, 1);
  }
  return text_list.join('');
}

export default async function textProcess(text, number, type, accessToken) {
  const { list, dict } = await initData(number, type, accessToken);
  return process(list, dict, text, number, type);
}