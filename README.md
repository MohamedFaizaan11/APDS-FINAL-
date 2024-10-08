# Customer International Payments Portal

## Overview
This project is a secure Customer International Payments Portal designed to facilitate international transactions while ensuring high-level security for user data and interactions. The portal integrates a backend API and frontend, built using either React or Angular, focusing on password management, input validation, SSL encryption, and comprehensive attack prevention.

## Key Features
Secure Password Handling: Passwords are hashed and salted before being stored to prevent unauthorized access.
Input Validation: All user inputs are validated and whitelisted using Regular Expressions (RegEx) to avoid malicious inputs.
SSL Encryption: All traffic between users and the server is encrypted with SSL to ensure data confidentiality.
Protection Against Attacks: The system includes measures to protect against common web vulnerabilities and attacks, including:
SQL Injection
Cross-Site Scripting (XSS)
Cross-Site Request Forgery (CSRF)
Man-in-the-Middle (MitM) attacks

## Technology Stack
Frontend: React or Angular (choose based on your implementation)
Backend: ASP.NET Core API
Language: C# (for backend logic)
Database: Mongo Database

## Installation
### Prerequisites
Node.js and npm installed (for React/Angular)
.NET SDK for ASP.NET Core
Mongo Database

## Steps to Run Locally
### Clone the Repository:
Copy code
cd customer-payments-portal
### Install Dependencies: 

For React:
Copy code
cd frontend
npm install

For Angular:
Copy code
cd frontend
npm install
Configure Environment Variables:

## Run the Application:

### To start the frontend:
Copy code
npm start

### To run the backend API:
Copy code
cd backend
dotnet run

## Security Measures

Password Hashing and Salting: User passwords are hashed and salted before being stored in the database, using a secure hashing algorithm like bcrypt.
Whitelist Inputs with RegEx: All form inputs are validated using Regular Expressions to ensure only valid data is accepted.
SSL for All Traffic: SSL encryption is enforced for all communications between the frontend, backend, and database to ensure data security.
Attack Prevention: The portal is protected against various types of web attacks, including:
SQL Injection: All database queries use parameterized queries to avoid injection attacks.

## Video Link:
Watch a walkthrough of the portal here: https://youtu.be/_UxnXRBiPqs?si=qZ0sns-qQhBDakPC
