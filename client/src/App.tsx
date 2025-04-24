/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO: fix typescript types

import React, { Component } from "react";
import "./App.css";
import Modal from "./Modal";
import Spinner from "./Spinner";

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      transactions: [],
      selectedTransaction: null,
      spinnerVisible: true,
    };
  }

  async componentDidMount() {
    await this.fetchData();
    this.setState((prevState) => ({ ...prevState, spinnerVisible: false }));
  }

  async fetchData() {
    const response = await fetch("http://localhost:4000/transactions");
    const data = await response.json();
    this.setState({ ...this.state, transactions: data });
  }

  openModal = (transaction: any) => {
    this.setState({ ...this.state, selectedTransaction: transaction });
  };

  closeModal = () => {
    this.setState({ ...this.state, selectedTransaction: null });
  };

  handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = event.target.value.toLowerCase();
    // @ts-ignore
    const filteredTransactions = this.state.transactions.data.filter((transaction: any) =>
      transaction.description.toLowerCase().includes(filterText),
    );
    this.setState({ ...this.state, transactions: { data: filteredTransactions } });
  };

  expensiveCalculation = () => {
    // Do not modify or remove expensiveCalculation. Instead, improve performance by reducing the
    // frequency of re-rendering.
    const start = performance.now();
    while (performance.now() - start < 150) {
      // Simulate an expensive calculation
    }
  };

  render() {
    this.expensiveCalculation();
    return (
      <div>
        {/* @ts-ignore */}
        {this.state.spinnerVisible && <Spinner />}
        <h1>Transactions Viewer App</h1>
        <p>Total transactions: TODO - get count</p>
        <div style={{ height: "60vh", overflowY: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
              <tr>
                <td>Transaction ID</td>
                <td>Amount</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              {(this.state?.transactions?.data || []).map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>
                    {/* TODO: use event delegation instead of attaching an event listener on each element */}
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        this.openModal(transaction);
                      }}
                    >
                      {transaction.transactionId}
                    </a>
                  </td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <input type="text" onChange={this.handleFilter} />

        {/* @ts-ignore */}
        {this.state.selectedTransaction && (
          // @ts-ignore
          <Modal transaction={this.state.selectedTransaction} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
