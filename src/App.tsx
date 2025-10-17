// import { Link, Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <>
      <main className="relative w-full min-h-dvh">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
