import React, { ReactNode, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

interface Budget {
  id: string;
  name: string;
  max: number;
}

interface Expense {
  id: string;
  budgetId: string;
  amount: number;
  description: string;
}

interface BudgetsContextType {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetExpenses: (budgetId: string) => Expense[];
  addBudget: (budget: Omit<Budget, "id">) => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteBudget: (id: string) => void;
  deleteExpense: (id: string) => void;
}

const BudgetsContext = React.createContext<BudgetsContextType | undefined>(
  undefined
);

export const UNCATEGORISED_BUDGET_ID = "uncategorised";

export function useBudgets() {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetsProvider");
  }
  return context;
}

interface BudgetsProviderProps {
  children: ReactNode;
}

export const BudgetsProvider: React.FC<BudgetsProviderProps> = ({
  children,
}) => {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  function getBudgetExpenses(budgetId: string): Expense[] {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addBudget({ name, max }: Omit<Budget, "id">): void {
    setBudgets((prevBudgets: Budget[]) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidv4(), name, max }];
    });
  }

  function addExpense({
    description,
    amount,
    budgetId,
  }: Omit<Expense, "id">): void {
    setExpenses((prevExpenses: Expense[]) => {
      return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }];
    });
  }

  function deleteBudget(id: string): void {
    setBudgets((prevBudgets: Budget[]) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
    // TODO: deal with expenses
  }

  function deleteExpense(id: string): void {
    setExpenses((prevExpenses: Expense[]) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
