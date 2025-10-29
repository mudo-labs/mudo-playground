import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <h1 className="logo fixed z-[100] top-4 left-4 md:top-8 md:left-8 lg:top-[3.125rem] lg:left-20 ">
        <Link to={'/'}>
          <img src="/logo-ready-brown.png" alt="ALLMUDO 로고" className="w-[7rem] md:w-[9.375rem] lg:w-full" />
        </Link>
      </h1>
    </>
  );
}
