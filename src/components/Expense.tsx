import React from "react";
import { Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { Expense } from "../types";

interface ExpenseProps {
  expense: Expense;
  onDelete: () => void;
}

const ExpenseComponent: React.FC<ExpenseProps> = ({ expense, onDelete }) => {
  return (
    <tr>
      <td>{expense.name}</td>
      <td>{currencyFormatter.format(expense.amount)}</td>

      <td>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ExpenseComponent;
