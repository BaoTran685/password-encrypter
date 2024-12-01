# Overview
- This is a web project. <br />
- The frontend uses Next.js framework and is hosted on Vercel. <br />
- The [backend](https://github.com/BaoTran685/python-server__password-encrypter) uses Nginx as the webser and reverse proxy to handle incoming HTTP requests, Python Flask to process requests, and Gunicorn (a WSGI server) as a bridge between them to balance the load. All of them together make my web application stable and reliable in production. <br />
- The backend and the MySQL database storing encryption keys are hosted on AWS EC2. <br />

# What is in it?
- It has 2 main functions, which are generating a random password and encrypt/decrypt a password. <br />
- The algorithm used to encrypt the password includes hashing and salting, making it 99.99% secure against cracking attempts. <br />

# How does it work?
- When a user type in a password and a key, they will be passed to the server through API routes. The server will then fetch the encryption key from the MySQL database and the server will hash and salt the password according to the key. <br />
- There are 100,001 different encryption keys in the MySQL database, making it almost impossible to perform decryption without the correct key. <br />
- For decrypting password, the similar but reverse path is applied. <br />

# Note:
- Coordinate vector is a string written in an array of numbers, depending on which base we use.
- The standard base is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>/?|\'\"~", which is 92 characters long.
- In our database, there are 100,001 different base, where each will give a different coordinate vector for the same string.
# How does the encrypting algorithm work?
## Encryption
- First, from the client input, we have a "key" and a "password", let Key:="key" and Password:="password".
- Key is then turned into a coordinate vector using the standard base.
- Depending on Key, we go into our database and get another base which is different from the standard base, we call it Base. Each Key should give a different base.
- Then we write Password in its coordinate vector form using Base. After that, we hash each entry of the coordinate vector using hash seed calculated based on Key. Then, we salt the hash by injecting random numbers (from 0 - 91) into the coordinate vector. Ofcourse, we have to remember the order of injection so that we can decrypt it afterward.
- Finally, the coordinate vector after hash and salt, is converted back into the string representation and return to the client.
## Decryption
- Similar to Encryption, but in opposite order.
- First, we still get Key and Password from the client. Key is then turned into a coordinate vector and we get Base. Note that if Key is the same, we get the same Base and that makes our encryption/decryption work.
- Then, to turn the encrypted string back into its original one, we remove the salt, then hash it in the backward direction (opposite to in Encryption). But it is a pain to do so because we have to work with negative numbers. So we reverse Base, then apply hash in forward direction like in Encryption, and we get the original password. We have successfully decrypt it!!!