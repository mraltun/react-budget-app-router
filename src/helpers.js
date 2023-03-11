// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// Delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
