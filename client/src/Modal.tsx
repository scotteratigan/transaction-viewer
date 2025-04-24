import { useState, useEffect } from "react";

const Modal = ({ transaction, onClose }) => {
  const [transactionDetails, setTransactionDetails] = useState({
    transactionId: "placeholder",
    accountNumber: "placeholder",
    transactionDate: "placeholder",
    amount: "placeholder",
    description: "placeholder",
    customer: "placeholder",
    referenceNumber: "placeholder",
    merchant: "placeholder",
    merchantLocation: {
      city: "placeholder",
      country: "placeholder",
    },
    notes: "placeholder",
  });

  useEffect(() => {
    // todo: fetch data from http://localhost:4000/transactions/ID
    // using the id passed in via 'transaction' prop render in modal
  }, []);

  return (
    <div
      className="modal"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <div className="modal-content">
        <span
          className="close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          &times;
        </span>
        <h2>Transaction Details</h2>
        <p>
          <strong>Transaction ID:</strong> {transactionDetails.transactionId}
        </p>
        <p>
          <strong>Account Number:</strong> {transactionDetails.accountNumber}
        </p>
        <p>
          <strong>Transaction Date:</strong>{" "}
          {new Date(transactionDetails.transactionDate).toLocaleString()}
        </p>
        <p>
          <strong>Amount:</strong> ${transactionDetails.amount}
        </p>
        <p>
          <strong>Description:</strong> {transactionDetails.description}
        </p>
        <p>
          <strong>Customer:</strong> {transactionDetails.customer}
        </p>
        <p>
          <strong>Reference Number:</strong> {transactionDetails.referenceNumber}
        </p>
        <p>
          <strong>Merchant:</strong> {transactionDetails.merchant}
        </p>
        <p>
          <strong>Merchant Location:</strong> {transactionDetails.merchantLocation.city},{" "}
          {transactionDetails.merchantLocation.country}
        </p>
        <p>
          <strong>Notes:</strong> {transactionDetails.notes}
        </p>
      </div>
    </div>
  );
};

// todo: close modal when user clicks in page outside of modal

export default Modal;
