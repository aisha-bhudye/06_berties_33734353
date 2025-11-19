# Berties Books
This application allows the user to view the list of books available in store, search for books and add books 
# How to view application
links.txt has been provided with link.
# How to run application locally 
Uses node.js with Express and EJS.

To install and run:

npm install
node index.js
## dotenv

This application uses the `dotenv` module to securely manage database credentials. 

### Implementation:
- Database credentials are stored in a `.env` file which is not committed to version control
- The `.env` file contains: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`
- These environment variables are loaded using `require('dotenv').config()` at the start of `index.js`
- The database connection pool reads credentials using `process.env.DB_HOST`, etc.
- A `.env.example` file is provided as a template showing required variables without exposing actual credentials

### Setup:
To run this application, create a `.env` file in the root directory based on `.env.example` and add your database credentials.

## Audit Logging

This application implements audit logging to track all login attempts for security monitoring.

### Implementation:
- Created a `login_audit` table with columns: `id`, `username`, `login_time`, `success`, and `ip_address`
- Modified the `/users/loggedin` route to log every login attempt (both successful and failed)
- Implemented `/users/audit` route that displays all login attempts in chronological order
- The audit log shows: username, timestamp, success/failure status, and IP address
- Failed attempts are logged for: non-existent users, incorrect passwords, and database errors

### Features:
- Timestamps are automatically recorded using MySQL's `CURRENT_TIMESTAMP`
- IP addresses are captured from the request object
- Records are displayed in reverse chronological order (newest first). 

### AI Declaration

I acknowledge the use of [1] ChatGPT (https://chat.openai.com/) to [2] assist with identifying and debugging errors in my code, clarifying programming concepts, and suggesting improvements to code structure. I entered the following prompts on 16-19 November 2025:

[3] Example prompts used:

“Explain why this error message appears in my code and how to fix it.”

“Suggest a clearer way to structure this function.”

“What is the correct syntax for implementing this feature?”

[4] The output from the generative artificial intelligence was used only to understand errors, explore potential solutions, and improve the organisation of my code. No AI-generated code was copied or included in the final submitted application. All implementation decisions and final code are my own.

## Reference

OpenAI (2025) ChatGPT [Generative AI model]. Available at: https://chat.openai.com/ (Accessed: 16-19 November 2025).