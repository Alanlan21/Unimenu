
# 🍽️ UniMenu – Mobile Food Ordering App

![Expo](https://img.shields.io/badge/Expo-5.0.14-blue?logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.76.7-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

## 🧾 Technical Overview

**UniMenu** is a cross-platform mobile ordering app designed for canteens and restaurants. It allows users to browse menus, add personalized items to the cart, pay online, and track their order status through a user-friendly interface.

---

## 🚀 Technologies Used

- **React Native with Expo**
- `expo-router` for file-based navigation
- Context API (`AuthProvider`, `CartProvider`)
- **Stripe API** integration for payments
- `axios` for RESTful API consumption
- Strongly typed with **TypeScript**
- Native styling with React Native components

---

## 🧩 Features

- Authentication with JWT (login and registration)
- Dashboard with searchable list of stores
- Store screen with filterable menu by category
- Item customization modal (quantity & notes)
- Lateral cart with subtotal and navigation
- Stripe-integrated checkout and backend order creation
- Order history separated by status
- Profile screen with user information

---

## 🔐 Security

- JWT-based authentication
- Form validation on frontend
- Authorization headers for protected requests

---

## 📂 Navigation Flow

```txt
(auth)/login → dashboard → stores/[id] → cart → checkout
(auth)/register → dashboard
dashboard → profile / orders
```

---

## ✅ Highlights

- Modern, responsive UI
- Clear separation of concerns
- Strongly typed and reusable codebase
- Web-compatible via `expo export --platform web`
- Modular, scalable project structure

---

## 🖼️ Screenshots (optional)

| Dashboard                    | Store/Menu                   |
|-----------------------------|------------------------------|
| ![dashboard](assets/demo1.png) | ![store](assets/demo2.png) |

| Cart                         | Checkout / Payment           |
|-----------------------------|------------------------------|
| ![cart](assets/demo3.png)  | ![checkout](assets/demo4.png) |

> Replace placeholders above with real screenshots.

---

## 📁 Folder Structure

```
📁 /contexts         → Auth and Cart providers
📁 /components       → Reusable UI components (inputs, headers, cards)
📁 /screens          → Route-based screens like dashboard, profile, cart
📁 /services         → Centralized axios instance
📁 /utils            → Form validation and helpers
```

---

## 📌 Notes

> This project is under active development. Features like social login and email confirmation are planned.

---

**Made with 💛 by passionate student developers.**


## Project Installation and Setup

```bash
$ git clone https://github.com/Alanlan21/Unimenu.git
$ cd unimenu
```
## Backend Setup

```bash
$ cd backend
$ npm install
$ npm audit fix # If necessary
# watch mode:
$ npm run start:dev
#development mode:
$ npm run start
```

## Frontend setup

```bash
$ cd frontend
$ npm install
$ npm run dev
```

## API Endpoints

```bash
POST /login - User authentication

POST /register - User registration
```


