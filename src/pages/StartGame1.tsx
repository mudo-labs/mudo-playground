import { useEffect, useState } from 'react';

// 맵 데이터 (0: 길, 1: 벽, 2: 아이템)
const initialMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 2, 0, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 2, 0, 1, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 2, 1, 1, 1],
  [0, 2, 1, 1, 1, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 2, 0, 0, 0, 0, 2, 1, 0],
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

// 방향키 입력에 따른 좌표 변화
const directions: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

export default function StartGame1() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [moving, setMoving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMap, setCurrentMap] = useState(initialMap);

  const handleCloseModal = (modalPosition: [number, number]) => {
    // 모달을 닫을 때, 모달이 열린 위치의 아이템을 길(0)로 변경
    const newMap = currentMap.map(row => [...row]);
    newMap[modalPosition[1]][modalPosition[0]] = 0;
    setCurrentMap(newMap);
    setShowModal(false);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (moving || showModal) return;

      const dir = directions[e.key];
      if (!dir) return;

      const [dx, dy] = dir;
      const [x, y] = position;
      const newX = x + dx;
      const newY = y + dy;

      if (newY < 0 || newY >= currentMap.length || newX < 0 || newX >= currentMap[0].length) {
        return;
      }

      const nextTile = currentMap[newY][newX];

      if (nextTile === 1) {
        return;
      }

      // 부드러운 이동 애니메이션 시작
      setMoving(true);
      let step = 0;
      const steps = 10;
      const interval = setInterval(() => {
        step++;
        setOffset([dx * (step / steps) * 100, dy * (step / steps) * 100]);
        if (step === steps) {
          clearInterval(interval);

          // 위치 업데이트 후 아이템 체크
          if (nextTile === 2) {
            setShowModal(true);
          }

          setPosition([newX, newY]);
          setOffset([0, 0]);
          setMoving(false);
        }
      }, 20);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, moving, showModal, currentMap]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="relative w-full max-w-lg mx-auto border-2 border-black overflow-hidden"
        style={{
          aspectRatio: `${initialMap[0].length} / ${initialMap.length}`,
        }}
      >
        {currentMap.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                absolute
                w-[10%] min-w-[36px] aspect-square
                ${cell === 1 ? 'bg-black' : cell === 2 ? 'bg-yellow-500' : 'bg-white'}
                border-t border-r border-gray-400
              `}
              style={{
                left: `${x * 10}%`,
                top: `${y * (100 / initialMap.length)}%`,
                minHeight: '36px',
              }}
            />
          )),
        )}

        {/* 캐릭터 (빨간색) */}
        <div
          className="absolute w-[10%] aspect-square bg-red-600 z-10"
          style={{
            minWidth: '36px',
            transform: `translate(${position[0] * 100 + offset[0]}%, ${position[1] * 100 + offset[1]}%)`,
            transition: 'transform 0.2s linear',
          }}
        />

        {/* 모달 창 */}
        {showModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h2 className="text-xl font-bold mb-4">명수는 12살</h2>
              <p className="mb-4">ㅊㄱㄷㅇㄱㅁㄷ</p>
              <button
                onClick={() => handleCloseModal(position)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
