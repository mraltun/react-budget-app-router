import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { createBudget, fetchData, wait } from "../helpers";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import Intro from "../components/Intro";

// Loader
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
};

// Action
export const dashboardAction = async ({ request }) => {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }
};

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className='dashboard'>
          <h1>
            Welcome back <span className='accent'>{userName}</span>
          </h1>
          <div className='grid-sm'>
            {budgets && budgets.length > 0 ? (
              <div className='grid-lg'>
                <div className='flex lg'>
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
              </div>
            ) : (
              <div className='grid-sm'>
                <p>Personal budgeting is the secret to financial freedom</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
      Dashboard
    </>
  );
};

export default Dashboard;
