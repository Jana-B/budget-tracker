import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Expense } from "../types";
import { currencyFormatter } from "../utils";

interface ViewExpensesProps {
  show: boolean;
  onClose: () => void;
  expenses: Expense[];
  onDeleteExpense: (expenseId: number) => void;
}

const ViewExpenses: React.FC<ViewExpensesProps> = ({
  show,
  onClose,
  expenses,
  onDeleteExpense,
}) => {
  const handleDeleteExpense = (expenseId: number) => {
    onDeleteExpense(expenseId);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{currencyFormatter.format(expense.amount)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewExpenses;
