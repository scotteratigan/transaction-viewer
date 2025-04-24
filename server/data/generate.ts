import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

/**
 * Generates a mock customer object with a random name.
 * @returns {Object} A customer object.
 */
function generateCustomer() {
  return {
    name: faker.person.fullName(),
  };
}

/**
 * Generates a mock transaction object associated with a random customer.
 * @param {Array<Object>} customers - List of customer objects to associate with the transaction.
 * @returns {Object} A transaction object.
 */
function generateTransaction(customers: string[]) {
  return {
    transactionId: faker.string.uuid(),
    accountNumber: faker.finance.accountNumber(),
    transactionDate: faker.date.past(),
    amount: faker.finance.amount(),
    description: faker.commerce.product(),
    customer: faker.helpers.arrayElement(customers),
    referenceNumber: faker.string.alphanumeric(10),
    merchant: faker.company.name(),
    merchantLocation: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
    notes: faker.lorem.paragraph(),
  };
}

/**
 * Generates a list of mock customer objects.
 * @param {number} count - The number of customers to generate.
 * @returns {Array<Object>} An array of customer objects.
 */
function generateCustomers(count: number) {
  const customers = Array.from({ length: count }, () => generateCustomer());
  return customers.map((customer) => customer.name);
}

/**
 * Generates a list of mock transaction objects.
 * @param {number} count - The number of transactions to generate.
 * @param {Array<Object>} customers - List of customer objects to associate with the transactions.
 * @returns {Array<Object>} An array of transaction objects.
 */
function generateTransactions(count: number, customers: string[]) {
  return Array.from({ length: count }, () => generateTransaction(customers));
}

/**
 * Generates mock data for customers and transactions, and saves it to a JSON file.
 * Logs the file path upon successful save or logs an error if the operation fails.
 * @async
 */
async function saveMockDataToFile() {
  try {
    const customers = generateCustomers(200);
    const transactions = generateTransactions(2500, customers);
    const fileName = "transactions.json";
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, fileName);
    const fileContents = JSON.stringify(transactions, null, 2);
    await writeFile(filePath, fileContents);
    console.log(`Mock data saved to ${filePath}`);
  } catch (error) {
    console.error("An error occurred while saving mock data:", error);
  }
}

saveMockDataToFile();
