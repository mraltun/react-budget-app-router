import React from "react";

export const Table = ({ expenses }) => {
  return (
    <div className='table'>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>{expense.name}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
