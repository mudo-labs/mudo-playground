import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav className="bg-white border-b">
        <div className="container mx-auto flex h-14 items-center gap-6 px-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            Home
          </Link>
          <Link
            to="/game1"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            게임예시 1
          </Link>
          <Link
            to="/game2"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            게임예시 2
          </Link>
          <Link
            to="/game3"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            게임예시 3
          </Link>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
}

export default App;
