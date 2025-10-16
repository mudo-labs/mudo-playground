import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { homeMovingImage } from '../util/homeMovingImage';

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const contentNameRef = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    const logo = document.querySelector('.logo > img') as HTMLImageElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    const viewBox = document.querySelector('.view-box') as HTMLElement;
    const movingImgs = document.querySelector('.moving-imgs') as HTMLElement;
    const circle = document.querySelector('.circle') as HTMLElement;
    const mouseIcon = document.querySelector('.mouse-ico') as HTMLElement;
    const mouseWheel = document.querySelector('.mouse-ico > span') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;

    if (logo) {
      logo.setAttribute('src', '/logo-ready-white.png');
    }

    if (footer) {
      footer.style.position = 'fixed';
      footer.style.color = 'white';
    }

    // 타임라인 생성(이벤트가 순차적으로 일어나게 하기 위해서)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: viewBox,
        start: 'top top',
        end: () => `+=${movingImgs!.scrollWidth - window.innerWidth + window.innerWidth * 2}`, // 여기에 여유 구간 줘야 circle 커지는 구간이 생김(현재 window.innerWidth * 2 로 200vw정도의 크기임)
        scrub: true,
        pin: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    // 첫 번째 시점: 이미지 가로 이동
    tl.fromTo(
      movingImgs,
      {
        // 처음: 화면 오른쪽 바깥쪽(100vw)에서 시작
        x: () => window.innerWidth,
      },
      {
        // 끝: 화면 왼쪽 바깥쪽으로 완전히 빠져나감
        x: () => -movingImgs!.scrollWidth,
        duration: 1,
        ease: 'none',
      },
    );

    // 두 번째 시점 (여러 동작 묶음): 원 색상 변경, 원 안의 텍스트 색상 변경, 마우스 아이콘 색상 변경
    tl.add([
      gsap.to(circle, {
        backgroundColor: 'white',
        color: 'black',
        duration: 0,
      }),
      gsap.to(mouseIcon, {
        backgroundColor: 'black',
        duration: 0,
      }),
      gsap.to(mouseWheel, {
        backgroundColor: 'white',
        duration: 0,
      }),
      gsap.to(logo, {
        attr: { src: '/logo-go-white.png' },
        duration: 0,
      }),
    ]);

    // 잠깐 멈춤 (0.2 만큼 상태 유지. 단위가 초인지는 모르겠음)
    tl.to({}, { duration: 0.2 });

    // 세 번재 시점: circle 확장 (border radius 속성으로 모서리에 공백이 생기기때문에 130으로 더 크게 확장)
    tl.to(circle, {
      width: 'max(130vw, 130vh)',
      height: 'max(130vw, 130vh)',
      duration: 1,
      ease: 'none',
    });

    // 네 번째 시점: circle 사라지고 content 등장
    tl.add([
      tl.to(content, {
        display: 'flex',
      }),
      gsap.to(content, {
        opacity: 1,
        zIndex: 10,
        duration: 0.2,
      }),
      gsap.to(circle, {
        opacity: 0,
        visibility: 'none',
        duration: 0.2,
      }),
      gsap.to(logo, {
        attr: { src: '/logo-go-brown.png' },
        duration: 0,
      }),
      gsap.to(footer, {
        color: 'black',
        duration: 0,
      }),
    ]);
  }, []);

  // 컨텐츠 박스 클릭하면 바뀌는 title 영역 상태
  const [contentTitle, setContentTitle] = useState('Infinite Challenge');
  const [link, setContentLink] = useState('javascript:void(0)');

  const changeTitle = (e: React.MouseEvent<HTMLElement>) => {
    const winW = window.innerWidth;
    const contentList = document.querySelectorAll('.content ul li');
    // title 내부 글자 상태 변환
    setContentTitle(`${e.currentTarget.dataset.contentName}`);
    setContentLink(`${e.currentTarget.dataset.contentUrl}`);

    contentList.forEach(li => {
      if (e.currentTarget === li) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
    // 영문 -> 한글로 바뀌면서 폰트가 커지기때문에 각 분기점에 따라 한글 폰트 사이즈 줄여줌.
    if (contentNameRef.current) {
      if (winW < 768) {
        contentNameRef.current.style.fontSize = '2rem';
      } else if (winW < 1280) {
        contentNameRef.current.style.fontSize = '40px';
      } else {
        contentNameRef.current.style.fontSize = '50px';
      }
    }
  };

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  return (
    <div className="view-box relative w-dvw h-dvh flex items-center bg-[url('/src/assets/home/main-bg.jpg')] bg-center bg-cover text-white">
      {/* moving-imgs */}
      <div className="moving-imgs">
        <div className="flex flex-nowrap gap-[25%] items-center">
          <img src={homeMovingImage(1)} alt="배경 이미지" />
          <img src={homeMovingImage(2)} alt="배경 이미지" />
          <img src={homeMovingImage(3)} alt="배경 이미지" />
          <img src={homeMovingImage(4)} alt="배경 이미지" />
          <img src={homeMovingImage(5)} alt="배경 이미지" />
          <div className="flex flex-col items-end gap-[3.375rem] ">
            <img src={homeMovingImage(6)} alt="배경 이미지" className="max-w-none" />
            <img src={homeMovingImage(7)} alt="배경 이미지" className="max-w-none" />
          </div>
        </div>
        <div className="mt-[21vh] flex flex-nowrap gap-[25%] items-center">
          <img src={homeMovingImage(8)} alt="배경 이미지" />
          <img src={homeMovingImage(9)} alt="배경 이미지" />
          <img src={homeMovingImage(10)} alt="배경 이미지" />
          <img src={homeMovingImage(11)} alt="배경 이미지" />
          <img src={homeMovingImage(12)} alt="배경 이미지" />
          <img src={homeMovingImage(13)} alt="배경 이미지" />
        </div>
      </div>
      {/* moving-imgs */}

      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* circle */}
        <div className="circle flex flex-col justify-center items-center w-[21.25rem] aspect-square rounded-full bg-[rgba(124,124,124,0.3)] z-20 md:w-[480px] lg:w-[37.5rem]">
          <div className="text-center">
            <p className="text-4xl font-bold md:text-5xl lg:text-[2.5rem]">당신이 찾는 무도</p>
            <h2 className="jaro text-[3.75rem] md:text-[4.375rem] lg:text-[5rem]">ALL MUDO</h2>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[240%] flex flex-col items-center gap-1.5 md:translate-y-[280%] lg:translate-y-[310%]">
            <div className="mouse-ico w-4 h-[1.4375rem] rounded-full bg-white md:w-[1.125rem] md:h-[1.625rem] lg:w-5 lg:h-[1.8125rem]">
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-[0.1563rem] h-2 lg:h-2.5 rounded-full bg-black"></span>
            </div>
            <span className="text-2xs font-bold md:text-xs lg:base">scroll</span>
          </div>
        </div>
        {/* circle */}
        {/* content */}
        <div className="content hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh justify-center items-center opacity-0 bg-white -z-10 text-black">
          <Link to={link} className="text-center">
            <h3
              ref={contentNameRef}
              className="jaro text-7xl font-black text-dark-red md:text-[3.125rem] lg:text-[3.75rem]"
            >
              {contentTitle}
            </h3>
            {contentTitle === 'Infinite Challenge' ? (
              <p className="mt-1.5 text-light-gray md:text-lg lg:mt-3 lg:text-xl">당신의 경험에 무(모)한도전</p>
            ) : (
              <p className="mt-1.5 md:text-lg lg:mt-3 lg:text-xl">Click Here!!</p>
            )}
          </Link>
          <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <li
              data-content-name="없는게 없는 무도 게임"
              data-content-url="/game1"
              onClick={changeTitle}
              className="absolute top-1/2 left-1/2 -translate-x-[150%] translate-y-[70%] w-[6.25rem] aspect-square rounded-[1.25rem] skew-x-[15deg] skew-y-[7deg] bg-[url('/thumbnail-1.jpg')] bg-cover shadow-xl cursor-pointer md:-translate-x-[220%] md:translate-y-[30%] md:w-[9.375rem] lg:-translate-x-[280%] lg:-translate-y-[20%] lg:w-[12.5rem] transition-all duration-500 md:hover:skew-x-0 md:hover:skew-y-0"
            ></li>
            <li
              data-content-name="무도 짤 순서 맞추기 게임"
              data-content-url="/sequenceHome"
              onClick={changeTitle}
              className="absolute top-1/2 left-1/2 translate-x-[50%] translate-y-[105%] w-[6.25rem] aspect-square rounded-[1.25rem] skew-x-[3deg] skew-y-[-20deg] bg-[url('/thumbnail-2.jpg')] bg-cover shadow-xl cursor-pointer md:translate-x-[130%] md:translate-y-[65%] md:w-[9.375rem] lg:translate-x-[170%] lg:translate-y-[10%] lg:w-[12.5rem] transition-all duration-500 md:hover:skew-x-0 md:hover:skew-y-0"
            ></li>
            <li
              data-content-name="컨텐츠 3"
              data-content-url="javascript:void(0)"
              onClick={changeTitle}
              className="absolute top-1/2 left-1/2 -translate-x-[65%] translate-y-[230%] w-[6.25rem] aspect-square rounded-[1.25rem] skew-x-[6deg] skew-y-[8deg] bg-light-gray shadow-xl cursor-pointer md:-translate-x-[52%] md:translate-y-[120%] md:w-[9.375rem] lg:-translate-x-[72%] lg:translate-y-[62%] lg:w-[12.5rem] transition-all duration-500 md:hover:skew-x-0 md:hover:skew-y-0"
            ></li>
          </ul>
        </div>
        {/* content */}
      </section>
      <Outlet />
    </div>
  );
}
