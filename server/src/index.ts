import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const transactionsPath = join(__dirname, "..", "data", "transactions.json");

interface Transaction {
  transactionId: string;
  accountNumber: string;
  transactionDate: string;
  amount: string;
  description: string;
  customer: string;
}

let transactions: Transaction[] = [];
try {
  const data = fs.readFileSync(transactionsPath, "utf-8");
  transactions = JSON.parse(data);
  console.log("Transactions loaded successfully.");
} catch (error) {
  console.error("Error loading transactions:", error);
}

const app = express();

app.get("/transactions", (req, res) => {
  // todo: send back only the fields customer, amount, and description
  res.json(transactions);
});

app.get("/transactions/:transactionId", (req, res) => {
  res.send("TODO: implement this.");
});

app.all(/.*/, (req, res) => {
  res.send(`Method ${req.method} is not implemented on path ${req.path}`);
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
