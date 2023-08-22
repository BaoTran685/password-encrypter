export default function sumNumber(number) {
  var s = number.toString(2);
  var sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum += parseInt(s[i]);
  }
  return sum;
}