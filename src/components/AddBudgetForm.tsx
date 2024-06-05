import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Budget } from "../types";
import "../styles/Modal.css";

interface AddBudgetFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (newBudget: Budget) => void;
}

const AddBudgetForm: React.FC<AddBudgetFormProps> = ({
  show,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget: Budget = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      expenses: [],
    };
    onAdd(newBudget);
    setName("");
    setAmount("");
  };

  return (
    <Modal className="Modal" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="budgetName">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter a budget category..."
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="budgetAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter your budget.."
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

export default AddBudgetForm;
