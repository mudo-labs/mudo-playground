import { useSetAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { selectedCharaterAtom } from '../atoms/characterStore';
import { useNavigate } from 'react-router-dom';

const characters = [
  { src: '/images/char/Gill.png', alt: '길' },
  { src: '/images/char/hyeangdon.png', alt: '정형돈' },
  { src: '/images/char/JUNHA.png', alt: '정준하' },
  { src: '/images/char/you.png', alt: '유재석' },
  { src: '/images/char/park.png', alt: '박명수' },
  { src: '/images/char/HaHa.png', alt: '하하' },
  { src: '/images/char/nohong.png', alt: '노홍철' },
];

export default function Game1() {
  const [focusedIndex, setFocusedIndex] = useState(3);

  const setSelectedCharacter = useSetAtom(selectedCharaterAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setFocusedIndex(prevIndex => Math.max(0, prevIndex - 1));
      } else if (e.key === 'ArrowRight') {
        setFocusedIndex(prevIndex => Math.min(characters.length - 1, prevIndex + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleStartGame = () => {
    const selectedCharacter = characters[focusedIndex].alt;
    setSelectedCharacter(selectedCharacter);
    navigate('/StartGame1');
  };

  return (
    <>
      <div className=" min-w-[360px] min-h-screen flex flex-col justify-between">
        {/* 상단 섹션 */}
        <div>
          <div className="w-8 h-8 bg-white absolute top-4 left-4 rounded-[8px] flex justify-center items-center shadow-md shadow-[#C8C8C8]">
            <img src="/images/vector/speaker.png" alt="스피커 아이콘" />
          </div>
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
                {/* 캐릭터 이름을 표시하는 p 태그 추가 */}
                <p className="mt-2 text-center text-sm font-bold">{char.alt}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 하단 버튼 섹션 */}
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
