import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { setupServer } from "msw/node";
import { handlers } from "./mock-handlers";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders App component", () => {
  render(<App />);
  const headingElement = screen.getByText(/Transactions Viewer App/i);
  expect(headingElement).toBeVisible();
});
