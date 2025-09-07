
# 🍽️ UniMenu – Unified Food Ordering System

![Expo](https://img.shields.io/badge/Expo-5.0.14-blue?logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.76.7-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red?logo=nestjs)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

**UniMenu** is a full-stack food ordering system built for canteens and restaurants at UNIFOR university.  
This repository is structured with **separate branches** for each domain (backend, web, mobile).

> 📌 You're currently on the `main` branch — documentation only.

---

## 📁 Branches Overview

| Branch     | Description                              |
|------------|------------------------------------------|
| `mobile`   | Mobile app using React Native + Expo     |
| `web`      | Web frontend using React + Vite + Tailwind |
| `backend`  | API built with NestJS + MySQL + JWT + Stripe |

To work on a specific part of the system, switch to the corresponding branch:

```bash
git checkout backend  # or web, or mobile

## 🧾 Technical Overview

**UniMenu** is a cross-platform mobile ordering app designed for canteens and restaurants from UNIFOR university. It allows users to browse menus, add personalized items to the cart, pay online, and track their order status through a user-friendly interface.

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

## 🖼️ Screenshots

| Login                        | Register                     |
|-----------------------------|------------------------------|
| ![login](https://github.com/user-attachments/assets/5358cdfe-58b8-4565-b9f5-e5484cb6e4b4) | ![register](https://github.com/user-attachments/assets/ee2283a0-dfbd-450e-93ac-f42490b5f7d5) |

| Dashboard                    | Store/Menu                   |
|-----------------------------|------------------------------|
| ![dashboard](https://github.com/user-attachments/assets/71c1cb99-0109-4e9f-bc0c-48e49709195c) | ![store](https://github.com/user-attachments/assets/7f1c164d-11bd-4b2c-b614-646a4bd70d6d) |

| Cart                         | Checkout / Payment           |
|-----------------------------|------------------------------|
| ![cart](https://github.com/user-attachments/assets/0c5c343f-75d3-4255-986c-9f19b0e8c8c8) | ![checkout](https://github.com/user-attachments/assets/e2fe9d8e-b0d3-4f9d-b3f3-e39884dba47c) |




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


