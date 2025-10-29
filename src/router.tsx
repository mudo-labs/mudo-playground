import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SequenceHome from './pages/sequence/SequenceHome';
import NotFound from './pages/NotFound';
import Test from './pages/test';
import SequenceGame from './pages/sequence/SequenceGame';
import SequenceEnd from './pages/sequence/SequenceEnd';
import Search from './pages/Search';
import StartGuessMudo from './pages/StartGuessMudo';
import GuessMudo from './pages/GuessMudo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'GuessMudo', element: <GuessMudo /> },
      { path: 'sequenceHome', element: <SequenceHome /> },
      { path: 'sequenceGame', element: <SequenceGame /> },
      { path: 'sequenceEnd', element: <SequenceEnd /> },
      { path: 'test', element: <Test /> },
      { path: 'StartGuessMudo', element: <StartGuessMudo /> },
      { path: 'Search', element: <Search /> },
    ],
  },
]);

export default router;
