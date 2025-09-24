import { useEffect, useState } from 'react';
import { usePhotos } from '../libs/api';

type Tile = {
  type: 'path' | 'wall' | 'item';
  itemId?: string;
};

// 맵 데이터
const initialMap: Tile[][] = [
  [
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'item', itemId: '2XZP9LjkG21zLkDm5sZ2' },
  ],
  [
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
  ],
  [
    { type: 'item', itemId: 'alMMW4mKQw8IT7EoKaHO' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
  ],
  [
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'path' },
  ],
  [
    { type: 'item', itemId: 'wWbJzXpuTFINegud5xG9' },
    { type: 'path' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'item', itemId: 'v073ZkqJirz88LYnnsXl' },
    { type: 'path' },
  ],
  [
    { type: 'wall' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
  ],
  [
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
  ],
  [
    { type: 'path' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'path' },
  ],
  [
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
  ],
  [
    { type: 'wall' },
    { type: 'wall' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
  ],
  [
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'item', itemId: 'rg64672RsrH04KyiWJ5O' },
    { type: 'path' },
    { type: 'path' },
  ],
];

// 방향키 입력에 따른 좌표 변화
const directions: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

export default function StartGame1() {
  const [position, setPosition] = useState<[number, number]>([0, 10]);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [moving, setMoving] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentMap, setCurrentMap] = useState<Tile[][]>(initialMap);
  const [charDirect, setCharDirect] = useState<string>('/images/char/mudori_f.png');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [inputValue, setInputValue] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleCloseModal = (): void => {
    const newMap = currentMap.map(row => [...row]);
    newMap[position[1]][position[0]] = { type: 'path' };
    setCurrentMap(newMap);
    setShowModal(false);
    setSelectedItemId(null);
    setInputValue('');
    setFeedbackMessage('');
  };

  const { photos, loading, error } = usePhotos();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (moving || showModal) return;

      const dir = directions[e.key];
      if (!dir) return;

      if (e.key === 'ArrowUp') {
        setCharDirect('/images/char/mudori_b.png');
      } else if (e.key === 'ArrowDown') {
        setCharDirect('/images/char/mudori_f.png');
      } else if (e.key === 'ArrowLeft') {
        setCharDirect('/images/char/mudori_l.png');
      } else if (e.key === 'ArrowRight') {
        setCharDirect('/images/char/mudori_r.png');
      }

      const [dx, dy] = dir;
      const [x, y] = position;
      const newX = x + dx;
      const newY = y + dy;

      if (newY < 0 || newY >= currentMap.length || newX < 0 || newX >= currentMap[0].length) {
        return;
      }

      const nextTile = currentMap[newY][newX];

      if (nextTile.type === 'wall') {
        return;
      }

      setMoving(true);
      let step = 0;
      const steps = 10;
      const interval = setInterval(() => {
        step++;
        setOffset([dx * (step / steps) * 100, dy * (step / steps) * 100]);
        if (step === steps) {
          clearInterval(interval);
          setOffset([0, 0]);

          setPosition([newX, newY]);
          if (nextTile.type === 'item' && nextTile.itemId) {
            setSelectedItemId(nextTile.itemId);
            setShowModal(true);
          }
          setMoving(false);
        }
      }, 5);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, moving, showModal, currentMap]);

  const selectedQuestion = photos.find(item => item.id === selectedItemId);

  const handleAnswerCheck = (): void => {
    if (!selectedQuestion) return;

    const normalizeString = (str: string) => {
      if (!str) return '';
      // 모든 공백(\s)과 특정 구두점([.,!?'"()])을 제거하고 정답 검증 진행, 대소문자도 통일해서 진행.
      return str
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/[.,!?'"()]/g, '');
    };

    const normalizedInput = normalizeString(inputValue);
    const normalizedTitle = normalizeString(selectedQuestion.title);

    if (normalizedInput === normalizedTitle) {
      setFeedbackMessage('정답입니다!');
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    } else {
      setFeedbackMessage('오답입니다. 다시 시도해 보세요.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">문제 데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">데이터 로딩에 실패했습니다.</div>
    );
  }

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
                w-[12.5%] min-w-[45px] aspect-square
                ${cell.type === 'wall' ? 'bg-black' : cell.type === 'item' ? 'bg-yellow-500' : 'bg-white'}
                border-t border-r border-gray-400
              `}
              style={{
                left: `${x * 12.5}%`,
                top: `${y * (100 / initialMap.length)}%`,
                minHeight: '45px',
              }}
            />
          )),
        )}

        <img
          src={charDirect}
          className="absolute w-[12.5%] aspect-square z-10"
          style={{
            minWidth: '45px',
            transform: `translate(${position[0] * 100 + offset[0]}%, ${position[1] * 100 + offset[1]}%)`,
            transition: 'transform 0.2s linear',
          }}
        />

        {showModal && selectedQuestion && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white px-4 py-4 rounded-lg shadow-xl text-center flex flex-col gap-3">
              <p className="text-[20px] text-left">
                <span className="font-bold">회차</span> 무도를 부탁해
              </p>
              <img src={selectedQuestion.imgPath} alt="짤 이미지" />
              <p
                className={`text-sm font-bold ${feedbackMessage === '정답입니다!' ? 'text-green-600' : 'text-red-500'}`}
              >
                {feedbackMessage}
              </p>
              <div className="flex gap-1 justify-center my-2">
                {selectedQuestion.keyword?.split('').map((char, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-4 h-4 border-gray-400 border p-2 text-black font-bold text-md shadow-md"
                  >
                    {char}
                  </div>
                ))}
              </div>
              <input
                className="w-full p-2 px-4 border-2 border-[#C8C8C8] rounded-md"
                type="text"
                placeholder="정답을 입력해 주세요"
                name=""
                id=""
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
              <button
                onClick={handleAnswerCheck}
                className="bg-[#E6E9D8] text-[20px] text-black font-bold py-2 px-4 rounded-xl border-2 border-black"
              >
                정답확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
