import React from "react";
import { MdDelete } from "react-icons/md";
import Item from "./Item";
const List = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return <Item key={expense.id} handleEdit={handleEdit} handleDelete={handleDelete} expense={expense} />;
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses <MdDelete className="btn-icon"></MdDelete>
        </button>
      )}
    </>
  );
};

export default List;
