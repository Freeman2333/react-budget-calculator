import React from "react";
import { MdSend } from "react-icons/md";
const Form = ({ charge, amount, handleCharge, handleSubmit, handleAmount, edit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            value={charge}
            onChange={handleCharge}
            type="text"
            className="form-control"
            name="charge"
            id="charge"
            placeholder="e.g. rent"
          />{" "}
        </div>
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            value={amount}
            onChange={handleAmount}
            type="number"
            className="form-control"
            name="amount"
            id="amount"
            placeholder="e.g. 100"
          />{" "}
        </div>
      </div>{" "}
      <button type="submit" className="btn">
        {edit?'edit':'submit'}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default Form;
