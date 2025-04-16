# Password Manager Web Application

A secure and easy-to-use password manager web application where you can safely store and manage all your passwords. This application provides enhanced security with two-factor authentication (2FA), using OTP (One-Time Password) and cookie-based authentication.

---

## 🔧 Technologies Used

### Frontend:
- **React.js** – A JavaScript library for building user interfaces.
- **Redux** – A predictable state container for JavaScript apps.
- **Tailwind CSS** – A utility-first CSS framework for custom, responsive designs.

### Backend:
- **NestJS** – A progressive Node.js framework for building scalable server-side applications.
- **JWT (JSON Web Tokens)** – Used for secure token-based authentication.
- **Cookie-Based Authentication** – Secure login using HTTP-only cookies.
- **Access & Refresh Tokens** – Implements token-based authentication with both access and refresh tokens for secure session management.
- **OTP-Based Authentication** – Two-factor authentication via OTP for an additional layer of security.
- **Password Hashing** – Secure password storage using hashed passwords along with token-based authentication.

---

## 🚀 Features

- **Secure Password Storage**: Safely store and manage your passwords.
- **Two-Factor Authentication (2FA)**: Added security with OTP-based login.
- **Token-Based Authentication**: Uses JWT with access and refresh tokens to maintain secure sessions.
- **Cookie-Based Authentication**: Protects against unauthorized access via HTTP-only cookies.
- **Responsive UI**: Fully responsive design for use on both desktop and mobile devices.
- **Password Hashing**: Ensures passwords are securely hashed before storage.

---

## 🌐 Live Link
[password007.vercel.app](https://password007.vercel.app/)

---

## 🔒 Authentication Flow

### 1. **JWT Authentication**:
   - **Access Token**: A short-lived token used for securing user actions.
   - **Refresh Token**: A longer-lived token used to obtain a new access token once expired.

### 2. **Cookie-Based Authentication**:
   - Login credentials are stored securely in HTTP-only cookies to prevent XSS attacks.
   - Cookies maintain user sessions in a secure manner.

### 3. **OTP-Based Authentication**:
   - After initial login, an OTP is sent to the user's registered email for additional verification.
   - OTP expires after a short period to ensure maximum security.

### 4. **Password Hashing**:
   - User passwords are hashed before being stored to enhance security and prevent unauthorized access.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch.
3. Implement your changes.
4. Submit a pull request with a clear description of the changes.

## 📧 Contact

For any questions or suggestions, feel free to reach out to me at:
- Email: [hasibu.dcc@gmail.com](mailto:hasibu.dcc@gmail.com)
- LinkedIn: [Hasibul Islam](https://www.linkedin.com/in/hasibul-islam-6060541b3/)


