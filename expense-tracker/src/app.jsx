import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import "./App.css";
import { useEffect, useMemo, useState } from "react";

function App() {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food 🍔");

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const addTransaction = () => {
    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };

    setTransactions([newTransaction, ...transactions]);

    setTitle("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((t) => t.id !== id)
    );
  };

  const totals = useMemo(() => {

    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((acc, item) => acc + item.amount, 0);

    const expense = transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, item) => acc + item.amount, 0);

    return {
      income,
      expense: Math.abs(expense),
      balance: income + expense,
    };

  }, [transactions]);

  const funLines = [
    "💸 Your wallet is crying softly.",
    "☕ Too many coffees detected.",
    "🛍️ Shopping again? Dangerous move.",
    "🚀 Future rich you is watching.",
    "🍔 Maybe skip one burger today?",
    "😎 Money management level increasing.",
  ];

  const randomLine =
    funLines[
      Math.floor(Math.random() * funLines.length)
    ];

  return (
    <div className="app">

      <div className="container">

        {/* TOP SECTION */}

        <div className="top">

          <div>
            <h1>Expense Tracker</h1>
            <p>
              Track. Save. Survive adulthood 💀
            </p>
          </div>

          <div className="balance-card">
            <span>Total Balance</span>

            <h2>
              ₹ {totals.balance}
            </h2>
          </div>

        </div>

        {/* PROFILE */}

        <div className="profile-card">

          <div className="profile-left">

            <div className="avatar">
              😎
            </div>

            <div>
              <h2>
                {username
                  ? username
                  : "Unknown Legend"}
              </h2>

              <p>
                Financial Survivor
              </p>
            </div>

          </div>

          <div className="name-input-box">

            <input
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div className="profile-stats">

            <div>
              <span>Transactions</span>

              <h3>
                {transactions.length}
              </h3>
            </div>

            <div>
              <span>Savings</span>

              <h3>
                ₹{" "}
                {totals.balance > 0
                  ? totals.balance
                  : 0}
              </h3>
            </div>

          </div>

        </div>

        {/* CARDS */}

        <div className="cards">

          <div className="card income-card">
            <h3>Income</h3>

            <p>
              ₹ {totals.income}
            </p>
          </div>

          <div className="card expense-card">
            <h3>Expenses</h3>

            <p>
              ₹ {totals.expense}
            </p>
          </div>

          <div className="card fun-card">
            <h3>Money Advice</h3>

            <p>
              {randomLine}
            </p>
          </div>

        </div>

        {/* CHARTS */}

        <div className="charts-grid">

          {/* PIE CHART */}

          <div className="chart-box">

            <div className="chart-top">
              <h2>
                Expense Breakdown
              </h2>

              <span>📊</span>
            </div>

            <ResponsiveContainer
              width="100%"
              height={260}
            >

              <PieChart>

                <Pie
                  data={[
                    {
                      name: "Income",
                      value: totals.income,
                    },
                    {
                      name: "Expenses",
                      value: totals.expense,
                    },
                  ]}
                  dataKey="value"
                  outerRadius={90}
                >

                  <Cell fill="#22c55e" />

                  <Cell fill="#ef4444" />

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR GRAPH */}

          <div className="chart-box">

            <div className="chart-top">
              <h2>Money Flow</h2>

              <span>💸</span>
            </div>

            <ResponsiveContainer
              width="100%"
              height={260}
            >

              <BarChart
                data={[
                  {
                    name: "Income",
                    amount: totals.income,
                  },
                  {
                    name: "Expenses",
                    amount: totals.expense,
                  },
                  {
                    name: "Balance",
                    amount: totals.balance,
                  },
                ]}
              >

                <XAxis
                  dataKey="name"
                  stroke="#fff"
                />

                <YAxis stroke="#fff" />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#7c3aed"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="main-grid">

          {/* FORM */}

          <div className="form-box">

            <div className="form-header">

              <div>
                <h2>Add Transaction</h2>

                <p>
                  Track where your money goes 💸
                </p>
              </div>

              <div className="emoji-box">
                🪙
              </div>

            </div>

            <div className="input-group">

              <label>
                Transaction Name
              </label>

              <input
                type="text"
                placeholder="Netflix, Burger, Salary..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Amount
              </label>

              <input
                type="number"
                placeholder="+5000 or -300"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                <option>
                  Food 🍔
                </option>

                <option>
                  Shopping 🛍️
                </option>

                <option>
                  Travel ✈️
                </option>

                <option>
                  Bills 📄
                </option>

                <option>
                  Entertainment 🎮
                </option>

                <option>
                  Salary 💰
                </option>

                <option>
                  Other 📦
                </option>

              </select>

            </div>

            <button
              onClick={addTransaction}
            >
              + Add Transaction
            </button>

          </div>

          {/* HISTORY */}

          <div className="history-box">

            <h2>
              Recent Transactions
            </h2>

            {transactions.length === 0 ? (

              <div className="empty">
                No transactions yet 😴
              </div>

            ) : (

              transactions.map((t) => (

                <div
                  key={t.id}
                  className={`transaction ${
                    t.amount > 0
                      ? "positive"
                      : "negative"
                  }`}
                >

                  <div>

                    <h3>
                      {t.title}
                    </h3>

                    <small>
                      {t.category}
                    </small>

                  </div>

                  <div className="right">

                    <span>
                      {t.amount > 0
                        ? "+"
                        : "-"}
                      ₹
                      {Math.abs(t.amount)}
                    </span>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTransaction(t.id)
                      }
                    >
                      ✕
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;