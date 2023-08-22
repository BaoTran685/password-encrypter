import textProcess from "../function/process";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const accessToken = req.headers.authorization;
    const { text, number } = req.body;
    const data = await textProcess(text, parseInt(number), 0, accessToken);
    return res.status(200).json(data);
  } else {
    return res.status(400).json('unsupported method');
  }
}