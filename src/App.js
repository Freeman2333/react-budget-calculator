import React, { useState, useEffect } from "react";
import Form from "./comps/Form";
import Alert from "./comps/Alert";
import "./App.css";
import List from "./comps/List";
import uuid from "uuid/v4";
// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car", amount: 2600 },
//   { id: uuid(), charge: "credit", amount: 3600 }
// ];
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);

  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("effect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  },[expenses]);

  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
      }
      setCharge("");
      setAmount("");
      handleAlert({ type: "success", text: "item added" });
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount has to be bigger than zero`
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);

    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}

      <h1>budget calculator</h1>
      <main className="App">
        <Form
          handleSubmit={handleSubmit}
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          edit={edit}
        ></Form>
        <List
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        ></List>
        ;
      </main>
      <h1>
        Total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
