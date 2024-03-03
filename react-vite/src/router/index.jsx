import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';


import Quests from '../components/Quests';
import  Habits  from '../components/Habits'
import QuestDetails from '../components/Quests/questDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:  <>
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
        element: <QuestDetails />
      },
      {
        path: 
      }

    ],
  },
]);
