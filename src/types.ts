// types.ts
export interface Expense {
  id: number;
  name: string;
  amount: number;
  // date: Date;
  // category: string;
}

export interface Budget {
  id: number;
  name: string;
  amount: number;
  expenses: Expense[];
}
