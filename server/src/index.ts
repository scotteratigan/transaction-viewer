import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { networkSimulator } from "./network-simulator.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const transactionsPath = join(__dirname, "..", "data", "transactions.json");

interface BasicTransaction {
  transactionId?: string;
  accountNumber?: string;
  transactionDate?: string;
  amount?: string;
  description?: string;
  customer?: string;
}

export const app = express();
app.use(cors());
app.use(networkSimulator);

app.get("/transactions", (req, res) => {
  const data = fs.readFileSync(transactionsPath, "utf-8");
  const transactions = JSON.parse(data);
  let selectedData: any = [];
  transactions.forEach((transaction: BasicTransaction) => {
    const entry: BasicTransaction = {};
    entry.transactionId = transaction.transactionId;
    entry.accountNumber = transaction.accountNumber;
    entry.amount = transaction.amount;
    entry.description = transaction.description;
    selectedData = [...selectedData, entry];
  });
  const responseData = {
    length: selectedData.length,
    data: selectedData,
  };
  try {
    console.log("Returning transaction data.");
    res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
  }
});

app.get("/transactions/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;
  // todo: implement this endpoint - get all transaction data & filter it to find the id.
  // this endpoint should return 200 or 404
  res.status(500).send("Not implemented yet!");
});

app.all(/.*/, (req, res) => {
  res
    .status(404)
    .send(
      `Method ${req.method} is not implemented on path ${req.path}. See server/src/index.ts for details.`,
    );
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/transactions");
});
