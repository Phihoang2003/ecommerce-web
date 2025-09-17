# DPSHOPVN - E-commerce Platform 🛒

## 📋 Project Description

DPSHOPVN is a comprehensive e-commerce platform built with a modern full-stack architecture. The system provides all essential features for a professional online store.

## ✨ Key Features

* 🔐 **Authentication & Authorization**: Registration, login, forgot password, email verification
* 🛍️ **Product Management**: Product CRUD, categorization, search, filtering
* 🛒 **Shopping Cart**: Add, remove, update product quantities
* 💳 **Payments**: PayPal integration, Cash on Delivery (COD)
* 📱 **Responsive Design**: User-friendly on all devices
* 💬 **Realtime Chat**: Instant messaging system
* 🔔 **Notifications**: User notification system
* 🌐 **Multi-language**: Supports Vietnamese and English
* ⭐ **Product Reviews**: Review and rating system
* 📊 **Admin Dashboard**: Full-featured admin management

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/d880437c-faa0-4ca4-9918-f21f228092fb)

![image](https://github.com/user-attachments/assets/d75401cf-516d-419f-9d04-8a5e76ebe311)

![image](https://github.com/user-attachments/assets/76ce9477-cf0d-4eeb-ad02-0f4b4cb8ab39)

![image](https://github.com/user-attachments/assets/3229fd64-53a3-4983-9db0-751b14c9b888)

![image](https://github.com/user-attachments/assets/72d7ec34-c297-4c22-9732-cf4e2b167bc0)

![image](https://github.com/user-attachments/assets/f06880f1-8f3d-4000-85ab-79070022bd83)

![image](https://github.com/user-attachments/assets/c088d9fb-d489-417c-9007-f247005e7625)

![image](https://github.com/user-attachments/assets/d37471c8-9a26-4514-b96d-9bd9388ea5f8)

![image](https://github.com/user-attachments/assets/25e33743-b3e3-4e14-9f2d-f8445787c4e4)

![image](https://github.com/user-attachments/assets/d707c0b2-1eb0-440a-83d4-e076a57ef97f)

![image](https://github.com/user-attachments/assets/20154ffa-5264-45f2-b18c-9fcab055b01b)

![image](https://github.com/user-attachments/assets/d8904cdb-8e67-4825-a221-8aa087e57f55)

![image](https://github.com/user-attachments/assets/afec9ff1-b04e-4f1e-8b23-5030fded48e7)

![image](https://github.com/user-attachments/assets/3a659775-f606-434d-a48f-c9b5d6fd4649)

## 🛠️ Tech Stack

### Frontend

* **React 18** — Modern UI framework
* **TypeScript** — Type-safe language
* **Vite** — Fast build tool
* **Redux Toolkit** — Global state management
* **Material-UI (MUI)** — Component library
* **Tailwind CSS** — Utility-first CSS framework
* **React Router DOM** — SPA routing
* **Axios** — HTTP client
* **Socket.io Client** — Realtime communication
* **React i18next** — Internationalization
* **React Helmet** — SEO management
* **Swiper** — Touch slider
* **React Toastify** — Notification system
* **PayPal SDK** — Payment integration
* **Google OAuth** — Social authentication

### Backend

* **Node.js** — Runtime environment
* **Express.js** — Web framework
* **TypeScript** — Type-safe backend development
* **MongoDB** — NoSQL database
* **Mongoose** — MongoDB ODM
* **Socket.io** — Realtime communication
* **Redis** — Caching and session storage
* **JWT** — Authentication tokens
* **bcrypt** — Password hashing
* **Nodemailer** — Email service
* **Google Auth Library** — Google authentication
* **Helmet** — Security middleware
* **CORS** — Cross-origin resource sharing
* **Compression** — Response compression

### DevOps & Tools

* **Nodemon** — Development server
* **ESLint** — Code linting
* **i18next Scanner** — Translation key extraction
* **Slugify** — URL-friendly strings
* **UUID** — Unique ID generation

## 📦 Installation

### System Requirements

* Node.js >= 16.x
* npm or yarn
* MongoDB
* Redis (optional)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dpshopvn.git
cd dpshopvn
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3. Configure environment variables

#### Server (.env)

Create a `.env` file in the `server/` folder:

```env
# Database
MONGODB_URI=your_url
REDIS_URL=redis://localhost:6379

# JWT Secrets
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Client (.env)

Create a `.env` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 4. Start the application

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd client
npm run dev
```

### 5. Access the application

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:5000](http://localhost:5000)


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.

## 📞 Contact

* Email: [hoangphi1232003@gmail.com](mailto:hoangphi1232003@gmail.com)
* GitHub: [Phihoang2003](https://github.com/Phihoang2003)

## 🙏 Acknowledgments

* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Material-UI](https://mui.com/)
* [Tailwind CSS](https://tailwindcss.com/)
