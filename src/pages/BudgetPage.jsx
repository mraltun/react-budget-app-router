import { useLoaderData } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import { Table } from "../components/Table";
import { getAllMatchingItems } from "../helpers";

export const budgetLoader = async ({ params }) => {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you'are trying to find doesn't exist");
  }

  return { budget, expenses };
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className='grid-lg'>
      <h1 className='h2'>
        <span className='accent'>{budget.name}</span>
        Overview
      </h1>
      <div className='flex-lg'>
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className='grid-md'>
          <h2>
            <span className='accent'>{budget.name}</span>
            Expenses
          </h2>
          <Table expenses={expenses} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
