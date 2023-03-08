import { FC } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { HomePage } from '../modules/pages/home/Home';
import LeaderboardPage from '../modules/pages/leaderboard/Leaderboard';

// @TODO: check non-existing pages, add redirects
// @TODO add standard ERROR LAYOUT

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage />} />
      <Route path='leaderboard' element={<LeaderboardPage />} />
    </>
  )
);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;