# Secure Customer International Payments Portal

## Overview
This project involves the development of a **Customer International Payments Portal** and an accompanying **API** using **React** or **Angular**. The primary focus is to ensure robust security, data protection, and adherence to industry best practices to safeguard against vulnerabilities. The final submission will include a recorded demonstration of the application in action.

## Features and Requirements

### Customer Portal (Frontend)
- **Framework**: Developed using **React** or **Angular**.
- **Password Security**:
  - Passwords are stored securely using **hashing and salting** techniques.
- **Input Validation**:
  - All user input is validated and whitelisted using **RegEx patterns**.
- **Secure Traffic**:
  - All data transmission is encrypted and secured using **SSL**.
- **Comprehensive Security**:
  - Protection against various attacks such as **Cross-Site Scripting (XSS)**, **SQL Injection**, **Cross-Site Request Forgery (CSRF)**, and **Man-in-the-Middle (MITM)**.
- **Pre-created Users**:
  - User accounts are created manually as no user registration process is available.
- **User Roles and Permissions**:
  - Access control is implemented to restrict access to sensitive payment functions.

### API Development
- **Framework**: The accompanying **API** is developed using **Node.js**, **Express.js**, or other backend technologies as needed.
- **Security Measures**:
  - Passwords are secured with **hashing and salting**.
  - Input is validated with **RegEx** to prevent invalid data submissions.
  - SSL ensures secure communication between the client and server.
  - Comprehensive security measures are applied to address common vulnerabilities, following the **OWASP Top Ten** guidelines.

### Continuous Integration/Continuous Deployment (CI/CD)
- **Version Control**: The project codebase is managed using a **GitHub repository**.
- **Pipeline Setup**:
  - **CircleCI** is configured for automated builds and testing.
  - A **SonarQube** integration checks for code smells and security hotspots to maintain high code quality standards.

### Demonstration Video
A recorded demonstration showcasing the functionality of the project. 
The video will cover:
- Secure login and user authentication.
- User interactions within the portal.
- Demonstration of input validation and security measures.
- API responses and secure data handling.

LINK : https://youtu.be/ETICEHe2FWc?si=6BzTNUSg6Jjf2Eaq

## Project Structure

### Frontend
- **Components**:
  - **Login and Authentication** page.
  - **Dashboard** for managing international payments.
  - **Error Handling** components for alerts and notifications.
- **Routing**:
  - Implement secure routing with protected routes based on user roles.

### Backend (API)
- **Endpoints**:
  - RESTful API endpoints for user management and payment operations.
- **Middleware**:
  - Includes middlewares for **input sanitization**, **authentication**, and **error handling**.

## Installation and Setup

### Prerequisites
- **Node.js** and **npm** installed.
- **React** or **Angular CLI**.
- **Git** for version control.
- **CircleCI** account for CI/CD.
- **SonarQube** for code analysis.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/international-payments-portal.git
   cd international-payments-portal
