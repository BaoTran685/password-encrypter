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

