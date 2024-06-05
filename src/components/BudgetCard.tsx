import React, { useState } from "react";
import { Button, ProgressBar, Stack, Modal } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { Expense } from "../types";
import "../styles/BudgetCard.css";

interface Budget {
  id: number;
  name: string;
  amount: number;
  expenses: Expense[];
}

interface BudgetCardProps {
  budget: Budget;
  onDeleteBudget: (budgetId: number) => void;
  onAddExpenseClick: (budgetId: number) => void;
  onViewExpenseClick: (budgetId: number) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  budget,
  onDeleteBudget,
  onAddExpenseClick,
  onViewExpenseClick,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const deleteBudget = () => {
    onDeleteBudget(budget.id);
    setShowDeleteConfirmation(false);
  };

  const totalExpenses = calculateTotalExpenses(budget.expenses);
  const progressBarVariant = getProgressBarVariant(
    totalExpenses,
    budget.amount
  );
  const cardClassName = `budget-card ${
    totalExpenses > budget.amount ? "exceeded" : "budget-card"
  }`;

  return (
    <div className={cardClassName}>
      <div className="card-body">
        <div className="card-title d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="budget-name">{budget.name}</div>
          <div>
            {currencyFormatter.format(totalExpenses)}/
            {currencyFormatter.format(budget.amount)}
          </div>
        </div>
        <ProgressBar
          className="rounded-pill"
          variant={progressBarVariant}
          min={0}
          max={budget.amount}
          now={totalExpenses}
        />
        <Stack direction="vertical" gap={2} className="mt-4">
          <button
            className="card-button"
            onClick={() => onAddExpenseClick(budget.id)}
          >
            Add Expense
          </button>
          <button
            className="card-button"
            onClick={() => onViewExpenseClick(budget.id)}
          >
            View Expenses
          </button>
          <Button
            className="card-btn"
            variant={
              totalExpenses > budget.amount ? "outline-light" : "outline-danger"
            }
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Delete Budget
          </Button>
        </Stack>
      </div>
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this budget?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteBudget}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

function calculateTotalExpenses(expenses: Expense[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function getProgressBarVariant(amount: number, max: number) {
  const ratio = amount / max;
  if (ratio < 0.5) return "success";
  if (ratio < 0.75) return "warning";
  return "danger";
}

export default BudgetCard;
