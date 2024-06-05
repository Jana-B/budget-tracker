import React, { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetForm from "./components/AddBudgetForm";
import AddExpenseForm from "./components/AddExpenseForm";
import ViewExpenses from "./components/ViewExpenses"; // Import ViewExpenses component
import { Budget, Expense } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

interface BudgetTrackerProps {}

const App: React.FC<BudgetTrackerProps> = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [showViewExpenses, setShowViewExpenses] = useState(false);

  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const handleAddBudget = (newBudget: Budget) => {
    setBudgets([...budgets, newBudget]);
    setShowAddBudgetForm(false);
  };

  const handleAddExpense = (newExpense: Expense) => {
    if (selectedBudget) {
      const updatedBudget = {
        ...selectedBudget,
        expenses: [...(selectedBudget.expenses || []), newExpense],
      };
      setBudgets(
        budgets.map((b) => (b.id === selectedBudget.id ? updatedBudget : b))
      );
      setShowAddExpenseForm(false);
    }
  };

  const handleDeleteBudget = (budgetId: number) => {
    setBudgets(budgets.filter((budget) => budget.id !== budgetId));
  };

  const handleAddExpenseClick = (budgetId: number) => {
    const budget = budgets.find((b) => b.id === budgetId);
    if (budget) {
      setSelectedBudget(budget);
      setShowAddExpenseForm(true);
    }
  };

  const handleViewExpenseClick = (budgetId: number) => {
    const budget = budgets.find((b) => b.id === budgetId);
    if (budget) {
      setSelectedBudget(budget);
      setShowViewExpenses(true);
    }
  };

  const handleDeleteExpense = (expenseId: number) => {
    if (selectedBudget) {
      const updatedExpenses = selectedBudget.expenses.filter(
        (expense) => expense.id !== expenseId
      );
      const updatedBudget = {
        ...selectedBudget,
        expenses: updatedExpenses,
      };

      setSelectedBudget(updatedBudget);

      setBudgets(
        budgets.map((b) => (b.id === selectedBudget.id ? updatedBudget : b))
      );
    }
  };

  return (
    <>
      <div className="app-container">
        <Header />

        <div className="row mb-3">
          <div className="col">
            <button
              className="add-budget-btn"
              onClick={() => setShowAddBudgetForm(true)}
            >
              Add Budget
            </button>
          </div>
        </div>

        <div className="row">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            >
              <BudgetCard
                budget={budget}
                onDeleteBudget={handleDeleteBudget}
                onAddExpenseClick={handleAddExpenseClick}
                onViewExpenseClick={handleViewExpenseClick}
              />
            </div>
          ))}
        </div>

        <AddBudgetForm
          show={showAddBudgetForm}
          onClose={() => setShowAddBudgetForm(false)}
          onAdd={handleAddBudget}
        />

        <ViewExpenses
          show={showViewExpenses}
          onClose={() => setShowViewExpenses(false)}
          expenses={selectedBudget ? selectedBudget.expenses : []}
          onDeleteExpense={handleDeleteExpense}
        />

        <AddExpenseForm
          show={showAddExpenseForm}
          onClose={() => setShowAddExpenseForm(false)}
          onAdd={handleAddExpense}
        />

        <Footer />
      </div>
    </>
  );
};

export default App;
