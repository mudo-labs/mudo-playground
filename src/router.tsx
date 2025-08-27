import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Game1 from "./pages/Game1";
import Game3 from "./pages/Game3";
import Game2 from "./pages/Game2";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "game1", element: <Game1 /> },
      { path: "game2", element: <Game2 /> },
      { path: "game3", element: <Game3 /> },
    ],
  },
]);

export default router;
