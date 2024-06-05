import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Expense } from "../types";
import "../styles/Modal.css";

interface AddExpenseFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (newEpense: Expense) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  show,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
    };
    onAdd(newExpense);
    setName("");
    setAmount("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="expenseName">
            <Form.Label>Expense</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="e.g. Sushi, rent..."
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="expenseAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <button className="add-btn" type="submit">
            Add
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpenseForm;
