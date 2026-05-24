# 💰 Fin Tracker

A personal finance dashboard built with **React.js**, **Tailwind CSS**, and **Chart.js**.

## Features

- 🔐 Register / Login with localStorage auth
- 👤 Editable profile (name + photo)
- 📊 Summary cards (Balance, Income, Expenses)
- ➕ Add income & expense transactions
- 🔍 Search & filter transactions
- 🗑️ Delete transactions
- 🥧 Pie chart breakdown by category
- 📱 Fully responsive design
- 💾 Data persists via localStorage

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
```

## Tech Stack

| Tech | Version |
|------|---------|
| React | 18 |
| React Router DOM | 6 |
| Tailwind CSS | 3 |
| Chart.js | 4 |
| react-chartjs-2 | 5 |

## Project Structure

```
src/
├── charts/
│   └── ExpenseChart.jsx
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ProfileModal.jsx
│   ├── ProtectedRoute.jsx
│   ├── SummaryCards.jsx
│   ├── TransactionForm.jsx
│   └── TransactionHistory.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx
├── index.css
└── index.js
```

## Usage

1. Visit `/register` → create an account
2. Visit `/login` → sign in
3. Dashboard opens with 5 sample transactions
4. Add, search, filter, and delete transactions
5. Click your name/avatar (top-right) to edit profile or log out
