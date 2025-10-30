import { useSetAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { selectedCharaterAtom } from '../atoms/characterStore';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTItle';
import { HandIcon } from 'lucide-react';

const characters = [
  { src: '/images/char/Gill.png', alt: '길' },
  { src: '/images/char/hyeangdon.png', alt: '정형돈' },
  { src: '/images/char/JUNHA.png', alt: '정준하' },
  { src: '/images/char/you.png', alt: '유재석' },
  { src: '/images/char/park.png', alt: '박명수' },
  { src: '/images/char/HaHa.png', alt: '하하' },
  { src: '/images/char/nohong.png', alt: '노홍철' },
];

export default function GuessMudo() {
  usePageTitle('없는게 없는 무도 게임');

  const [focusedIndex, setFocusedIndex] = useState(3);

  const setSelectedCharacter = useSetAtom(selectedCharaterAtom);
  const navigate = useNavigate();

  useEffect(() => {
    let startX = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setFocusedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setFocusedIndex(prev => Math.min(characters.length - 1, prev + 1));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;

      if (dx > 30) {
        // 오른쪽 스와이프 → 오른쪽 캐릭터
        setFocusedIndex(prev => Math.min(characters.length - 1, prev + 1));
      } else if (dx < -30) {
        // 왼쪽 스와이프 → 왼쪽 캐릭터
        setFocusedIndex(prev => Math.max(0, prev - 1));
      }
    };

    // 이벤트 등록
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // 정리
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleStartGame = () => {
    const selectedCharacter = characters[focusedIndex].alt;
    setSelectedCharacter(selectedCharacter);
    navigate('/StartGuessMudo');
  };

  return (
    <>
      <div className=" min-w-[360px] min-h-screen flex flex-col justify-between">
        {/* 상단 섹션 */}
        <div>
          <div className="pt-[180px]">
            <h1 className="text-[36px] text-center font-semibold">없는 게 없는 무도 게임</h1>
            <p className="text-[16px] text-center">선택한 캐릭터와 관련된 짤을 보고 정답을 맞혀보세요!</p>
          </div>
          <div className="flex justify-center px-2 mt-16">
            {characters.map((char, i) => (
              <div
                key={i}
                className={`flex flex-col items-center mx-1 transition-opacity duration-300 ${
                  i === focusedIndex ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <img className="w-[46px] h-[100px]" src={char.src} alt={char.alt} />

                <p className="mt-2 text-center text-sm font-bold">{char.alt}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-10 md:hidden">
            <div className="relative flex items-center justify-center">
              <HandIcon className="w-8 h-8 text-yellow-500 animate-[swipe_1.8s_ease-in-out_infinite]" />
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-600">좌우로 스와이프하여 캐릭터를 선택해주세요!</p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            className="w-80 h-12 bg-[#E6E9D8] font-bold rounded-[12px] border-2 border-black"
            onClick={handleStartGame}
          >
            퀴즈 출바알
          </button>
        </div>
      </div>
    </>
  );
}
