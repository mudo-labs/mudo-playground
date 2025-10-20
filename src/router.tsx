import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Game1 from './pages/Game1';
import Game3 from './pages/Game3';
import SequenceHome from './pages/sequence/SequenceHome';
import NotFound from './pages/NotFound';
import Test from './pages/test';
import StartGame1 from './pages/StartGame1';
import SequenceGame from './pages/sequence/SequenceGame';
import SequenceEnd from './pages/sequence/SequenceEnd';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'game1', element: <Game1 /> },
      { path: 'sequenceHome', element: <SequenceHome /> },
      { path: 'sequenceGame', element: <SequenceGame /> },
      { path: 'sequenceEnd', element: <SequenceEnd /> },
      { path: 'game3', element: <Game3 /> },
      { path: 'test', element: <Test /> },
      { path: 'StartGame1', element: <StartGame1 /> },
    ],
  },
]);

export default router;
