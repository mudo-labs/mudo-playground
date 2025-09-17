import { useState, useEffect } from 'react';

const characters = [
  { src: '/images/char/Gill.png', alt: '길' },
  { src: '/images/char/Hyungdon.png', alt: '형돈' },
  { src: '/images/char/JUNHA.png', alt: '준하' },
  { src: '/images/char/Jaesuk.png', alt: '재석' },
  { src: '/images/char/Myungsoo.png', alt: '명수' },
  { src: '/images/char/HaHa.png', alt: '하하' },
  { src: '/images/char/Hongchul.png', alt: '홍철' },
];

export default function Game1() {
  const [focusedIndex, setFocusedIndex] = useState(3);

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
    alert(`선택된 캐릭터: ${selectedCharacter}!\n퀴즈를 시작합니다.`);
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
          <div className="flex justify-center pl-2 pr-2 mt-16">
            {characters.map((char, i) => (
              <img
                key={i}
                className={`w-[48px] h-[93px] mx-1 transition-opacity duration-300 ${
                  i === focusedIndex ? 'opacity-100' : 'opacity-40'
                }`}
                src={char.src}
                alt={char.alt}
              />
            ))}
          </div>
        </div>
        {/* 하단 버튼 섹션 */}
        <div className="flex justify-center mb-8">
          <a href="/StartGame1">
            <button
              className="w-80 h-12 bg-[#E6E9D8] font-bold rounded-[12px] border-2 border-black"
              onClick={handleStartGame}
            >
              퀴즈 출바알
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
