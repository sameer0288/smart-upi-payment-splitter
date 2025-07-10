import React, { useState, useRef } from "react";
import "./UPIForm.css";

const UPIForm = () => {
  const [expression, setExpression] = useState("");
  const [message, setMessage] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef(null);

  const evaluateExpression = (expr) => {
    try {
      const result = eval(expr.replace(/[^-()\d/*+.]/g, ""));
      setCalculatedAmount(result || 0);
    } catch {
      setCalculatedAmount(0);
    }
  };

  const handleExpressionChange = (e) => {
    const value = e.target.value;
    setExpression(value);
    evaluateExpression(value);
  };

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setExpression("");
      setMessage("");
      setCalculatedAmount(0);
    }, 3000);
  };

  const isValidAmount =
    calculatedAmount > 0 && /^[\d+\-*/.\s]+$/.test(expression);

  return (
    <div className="upi-container">
      <h2>Smart UPI Payment</h2>
      <div className="form-card">
        <label>Recipient Name</label>
        <input type="text" value="Bank Of India" disabled />

        <label>Amount (Enter expression)</label>
        <div className="amount-input-wrapper">
          <input
            type="text"
            ref={inputRef}
            value={expression}
            onChange={handleExpressionChange}
            placeholder="Ex: 50+20+30"
            className="amount-input"
          />
          <button
            type="button"
            className="plus-button"
            onClick={() => {
              setExpression((prev) => prev + "+");
              inputRef.current.focus();
            }}
          >
            +
          </button>
        </div>

        <p className="result">Calculated: ₹ {calculatedAmount}</p>

        <label>Message (optional)</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message"
        />

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={!isValidAmount}
        >
          Pay ₹{calculatedAmount}
        </button>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-circle">
              <div className="success-checkmark"></div>
            </div>
            <p>Payment Successful</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIForm;
