import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';


import Quests from '../components/Quests';
import  Habits  from '../components/Habits'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:  <>
                  <h1>Welcome!</h1>
                  <SignupFormPage />
                  <Habits/>
                  </>
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "/habits/:habitId",
        element: <Habits />
      },
      {
        path: "/quests",
        element: <Quests/>
      },
      {
        path: "/quests/:questId",
        element: <Quests />
      }

    ],
  },
]);
