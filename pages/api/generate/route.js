import randomNumber from "@/func/randomNumber";
import initData from "../function/init";

const process = async (len, accessToken) => {
  var { list } = await initData(randomNumber(0, 10000), 0, accessToken);
  var result = "";
  var k = list.length;
  for (let i = 0; i < len; i++) {
    var n = randomNumber(0, k - 1);
    result += list[n];
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { number } = req.body;
    const accessToken=req.headers.authorization;
    const text = await process(parseInt(number), accessToken);
    return res.status(200).json(text);
  } else {
    return res.status(400).json('unsupported method');
  }
}