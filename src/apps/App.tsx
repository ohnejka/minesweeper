import { FC, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { HomePage } from '../modules/pages/home';
import LeaderboardPage from '../modules/pages/leaderboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage />} />
      <Route path='leaderboard' element={<LeaderboardPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </>
  )
);

const App: FC = () => {
  useEffect(() => {
    console.log('created with 💖 by ohnejka');
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
