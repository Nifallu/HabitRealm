import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';


import Quests from '../components/Quests';
import  Habits  from '../components/Habits'
import QuestDetails from '../components/Quests/questDetails';
import Rewards from '../components/Rewards/rewards'
import RewardShop from '../components/Rewards/rewardsShop'


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
        path: "/rewards",
        element: <Rewards />
      }, 
      {
        path: "/rewards/shop",
        element: <RewardShop />
      }

    ],
  },
]);
