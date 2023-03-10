import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";
import wave from "../assets/wave.svg";

// Loader
export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className='layout'>
      <h1>Main</h1>
      <main>
        <Outlet />
      </main>
      <img src={wave} alt='' />
    </div>
  );
};

export default Main;
