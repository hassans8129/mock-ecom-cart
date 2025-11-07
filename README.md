# Mock E-Commerce Cart (Full Stack Assignment)

This is a basic full-stack shopping cart application built as per the Vibe Commerce internship assignment.  
It demonstrates frontend ↔ backend ↔ database flow for e-commerce cart operations.

---

## Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React + Vite      |
| Backend  | Node.js + Express |
| Database | MongoDB Atlas     |

---

## Features (as required)

### Backend APIs:

| Method | Route           | Description                            |
| ------ | --------------- | -------------------------------------- |
| GET    | `/api/products` | Get product list                       |
| POST   | `/api/cart`     | Add item `{ productId, qty }`          |
| DELETE | `/api/cart/:id` | Remove item from cart                  |
| GET    | `/api/cart`     | Get cart items + total amount          |
| POST   | `/api/checkout` | Create mock checkout (returns receipt) |

### Frontend Screens:

- Products grid with **Add to Cart**
- Cart view → shows items, qty, total + remove
- Checkout form → name & email, then shows receipt summary

### Bonus covered:

- DB persistence
- Error handling (APIResponse / APIError)
- JWT mock auth implemented (not required but added as bonus)

---

## How to Run

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

### 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173
Backend runs at: http://localhost:3000

### Folder Structure

```
mock-ecom-cart/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── utils/
│ │ └── validators/
│ └── server.js
│
├── frontend/
│ └── src/
│ ├── api/
│ ├── pages/
│ └── App.jsx
│
├── screenshots/
│ ├── products.png
│ ├── cart.png
│ └── checkout.png
│
└── README.md
```

## Screenshots

### Products Page

![Products Page](./screenshots/products.png)

### Cart Page

![Cart Page](./screenshots/cart.png)

### Checkout Receipt

![Checkout Page](./screenshots/checkout.png)

### Final Notes

This project focuses strictly on the exact assignment requirements:
basic cart logic, REST APIs, mock checkout with DB persistence and working UI.

The code is clean, modular, and extendable for real auth/payments later if needed.
