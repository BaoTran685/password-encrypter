'use server'

const SERVER_URL = process.env.SERVER_URL

export const generatePassword = async ({
  specialChar,
  upperCase
}: {
  specialChar: number
  upperCase: number
}) => {
  const res = await fetch(SERVER_URL + '/generate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ specialChar, upperCase })
  })
  
  if (res.ok) {
    console.log('true');
    const { password } = await res.json()
    return {password, ok: res.ok}
  }
  return {password: '', ok: false}
}
