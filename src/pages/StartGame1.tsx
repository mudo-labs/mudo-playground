import { useEffect, useRef, useState } from 'react';
import { usePhotos } from '../libs/api';
import { selectedCharaterAtom } from '../atoms/characterStore';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

type Tile = {
  type: 'path' | 'wall' | 'item';
  itemId?: string;
  itemImgPath?: string;
};

// 초기 맵
const initialMap: Tile[][] = [
  [
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'path' },
    { type: 'item' },
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
    { type: 'item' },
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
    { type: 'item' },
    { type: 'path' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'path' },
    { type: 'wall' },
    { type: 'item' },
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
    { type: 'item' },
    { type: 'path' },
    { type: 'path' },
  ],
];

const directions: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

const TOTAL_QUESTIONS = 5;

const ITEM_IMAGE_PATHS = [
  '/images/logo/Frame-1.png',
  '/images/logo/Frame-2.png',
  '/images/logo/Frame-3.png',
  '/images/logo/Frame-4.png',
  '/images/logo/Frame-5.png',
];

export default function StartGame1() {
  const [position, setPosition] = useState<[number, number]>([0, 10]);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [moving, setMoving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMap, setCurrentMap] = useState<Tile[][]>(initialMap);
  const [charDirect, setCharDirect] = useState('/images/char/mudori_f.png');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [correctCount, setCorrectCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  // 오답 시 정답 공개를 위한 상태
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCharacter = useAtomValue(selectedCharaterAtom);
  const { photos, loading, error } = usePhotos();

  // photos 로딩 완료되면 map에 itemId 랜덤 배치
  useEffect(() => {
    // 새로고침 시 selectedCharacter가 없을 경우 대비
    if (!photos.length || !selectedCharacter) return;

    const newMap = currentMap.map(row => [...row]);

    const selectedPhotos = photos
      .filter(p => p.cast.includes(selectedCharacter))
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_QUESTIONS);

    let itemIndex = 0;
    for (let y = 0; y < newMap.length; y++) {
      for (let x = 0; x < newMap[y].length; x++) {
        if (newMap[y][x].type === 'item' && selectedPhotos[itemIndex]) {
          newMap[y][x].itemId = selectedPhotos[itemIndex].id;
          newMap[y][x].itemImgPath = ITEM_IMAGE_PATHS[itemIndex];
          itemIndex++;
        }
      }
    }

    setCurrentMap(newMap);
  }, [photos, selectedCharacter]);

  // 모달 닫기 핸들러 (아이템을 path로 변경하고 상태 초기화)
  const handleCloseModal = () => {
    if (selectedItemId) {
      // 정답/오답 여부와 관계없이 아이템을 'path'로 변경
      const newMap = currentMap.map(row =>
        row.map(cell => (cell.itemId === selectedItemId ? ({ type: 'path' } as Tile) : cell)),
      );
      setCurrentMap(newMap);

      // 오답으로 인해 닫히는 경우인지 확인
      if (isAnswerRevealed) {
        const newProgressCount = progressCount + 1;
        setProgressCount(newProgressCount);

        // 오답으로 닫혔을 때 게임이 끝났는지 확인
        if (newProgressCount === TOTAL_QUESTIONS) {
          setShowGameOverModal(true);
        }
      }
    }

    // 모달 상태 초기화
    setShowModal(false);
    setSelectedItemId(null);
    setInputValue('');
    setFeedbackMessage('');
    setIsAnswerRevealed(false); // 상태 리셋
  };

  // 정답 확인 로직 (정답/오답 분기 처리)
  const handleAnswerCheck = () => {
    if (!selectedItemId || isAnswerRevealed) return; // 중복 확인 방지

    const selectedQuestion = photos.find(p => p.id === selectedItemId);
    if (!selectedQuestion) return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/[.,!?'"()]/g, '');

    if (normalize(inputValue) === normalize(selectedQuestion.title)) {
      // [정답일 경우]
      setFeedbackMessage('정답입니다!');

      const newCount = correctCount + 1;
      setCorrectCount(newCount); //  최종 점수 카운트

      const newProgressCount = progressCount + 1;
      setProgressCount(newProgressCount); //  진행도 카운트

      // 마지막 문제인지 확인 (진행도 기준)
      if (newProgressCount === TOTAL_QUESTIONS) {
        setTimeout(() => {
          handleCloseModal(); // 현재 질문 모달 닫기
          setShowGameOverModal(true); // 게임 종료 모달 띄우기
        }, 1000);
      } else {
        setTimeout(handleCloseModal, 1000); // 다음 문제 위해 모달 닫기
      }
    } else {
      // [오답일 경우]
      setFeedbackMessage('오답입니다.');
      setIsAnswerRevealed(true); // 정답 공개 및 '닫기' 버튼 활성화
    }
  };
  // 모달이 열릴 때 input에 자동 포커스
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showModal]);

  // Enter 키로 정답 확인 또는 닫기
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isAnswerRevealed) {
        handleCloseModal(); // 오답이 공개된 상태면 Enter로 모달 닫기
      } else {
        handleAnswerCheck(); // 아니면 정답 확인
      }
    }
  };

  // 캐릭터 이동 로직 (키보드 이벤트)
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // 모달이 떠 있을 때는 이동 방지
      if (moving || showModal || showGameOverModal) return;
      const dir = directions[e.key];
      if (!dir) return;

      const [dx, dy] = dir;
      if (e.key === 'ArrowUp') setCharDirect('/images/char/mudori_b.png');
      else if (e.key === 'ArrowDown') setCharDirect('/images/char/mudori_f.png');
      else if (e.key === 'ArrowLeft') setCharDirect('/images/char/mudori_l.png');
      else if (e.key === 'ArrowRight') setCharDirect('/images/char/mudori_r.png');

      const [x, y] = position;
      const newX = x + dx;
      const newY = y + dy;
      if (newY < 0 || newY >= currentMap.length || newX < 0 || newX >= currentMap[0].length) return;

      const nextTile = currentMap[newY][newX];
      if (nextTile.type === 'wall') return;

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

          // 아이템 타일 도착 시 모달 띄우기
          if (nextTile.type === 'item' && nextTile.itemId) {
            setSelectedItemId(nextTile.itemId);
            setShowModal(true);
          }
          setMoving(false);
        }
      }, 5);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, moving, showModal, showGameOverModal, currentMap]);

  // 로딩 및 에러 처리
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
        <img src="/wait.png" alt="로딩 중 짤" className="w-80 max-w-full mb-8 rounded-lg shadow-md" />

        <div className="text-2xl font-bold text-gray-700 animate-pulse">게임을 불러오는 중입니다...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">데이터 로딩에 실패했습니다.</div>
    );

  // 맵 렌더링
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* 타이틀 및 진행도 */}

      <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">없는게 없는 무도 게임</h2>
      <div className="text-lg font-semibold text-gray-600 mb-4">
        <span>진행 정도 : </span>
        <span className="font-bold text-gray-900">
          {progressCount} / {TOTAL_QUESTIONS}
        </span>
      </div>

      <div
        className="relative w-full max-w-lg mx-auto border-2 border-black overflow-hidden rounded-md"
        style={{ aspectRatio: `${initialMap[0].length} / ${initialMap.length}` }}
      >
        {/* 맵 타일 렌더 */}
        {currentMap.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`absolute w-[12.5%] min-w-[45px] aspect-square ${
                cell.type === 'wall' ? 'bg-gray-800' : 'bg-white'
              } border-t border-r border-gray-300`}
              style={{
                left: `${x * 12.5}%`,
                top: `${y * (100 / initialMap.length)}%`,
                minHeight: '45px',
              }}
            >
              {cell.type === 'item' && cell.itemImgPath && (
                <img
                  src={cell.itemImgPath}
                  alt="아이템"
                  className="w-full h-full object-cover animate-[float-y_2.5s_ease-in-out_infinite]"
                />
              )}
            </div>
          )),
        )}

        {/* 캐릭터 */}
        <img
          src={charDirect}
          className="absolute w-[12.5%] aspect-square z-10"
          style={{
            minWidth: '45px',
            transform: `translate(${position[0] * 100 + offset[0]}%, ${position[1] * 100 + offset[1]}%)`,
            transition: 'transform 0.2s linear',
          }}
        />

        {/* 질문 모달 */}
        {showModal && selectedItemId && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20 p-4">
            <div className="bg-white px-4 py-5 rounded-lg shadow-xl text-center flex flex-col gap-4 w-full max-w-sm">
              <div className="flex items-center justify-start">
                <span className="text-sm font-bold text-white bg-gray-700 px-3 py-1 rounded-full mr-3">회차</span>
                <span className="text-lg font-semibold text-gray-800">무도를 부탁해</span>
              </div>
              <img
                src={photos.find(p => p.id === selectedItemId)?.imgPath}
                alt="짤 이미지"
                className="w-full object-contain rounded-md border border-gray-200" // ◀ rounded-md, border 추가
              />
              <p
                className={`text-base font-bold min-h-[1.5rem] ${
                  feedbackMessage === '정답입니다!' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {feedbackMessage || ' '}
              </p>

              {/* 오답일 경우 정답 표시 */}
              {isAnswerRevealed && (
                <p className="text-base font-semibold text-blue-600">
                  {/* ◀ text-sm font-bold -> text-base font-semibold */}
                  정답은: {photos.find(p => p.id === selectedItemId)?.title}
                </p>
              )}

              <div className="flex gap-2 justify-center my-2 flex-wrap">
                {photos
                  .find(p => p.id === selectedItemId)
                  ?.keyword?.split('')
                  .map((char, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-8 h-8 border-gray-300 border p-2 text-black font-bold text-lg shadow-sm rounded-md" // ◀ 스타일 수정
                    >
                      {char}
                    </div>
                  ))}
              </div>

              <input
                ref={inputRef}
                onKeyDown={handleInputKeyDown}
                disabled={isAnswerRevealed} // 오답 시 input 비활성화
                className="w-full p-3 px-4 border-2 border-gray-300 rounded-lg disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all" // ◀ 스타일 및 focus 효과 추가
                type="text"
                placeholder="정답을 입력해 주세요"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />

              {/* 정답 확인 / 닫기 버튼 분기 처리 */}
              {!isAnswerRevealed ? (
                <button
                  onClick={handleAnswerCheck}
                  className="bg-[#E6E9D8] text-xl text-black font-bold py-3 px-4 rounded-xl border-2 border-gray-800 hover:bg-yellow-200 active:bg-yellow-300 transition-colors" // ◀ text-[20px] -> text-xl, py-2 -> py-3, hover/active 효과 추가
                >
                  정답확인
                </button>
              ) : (
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-xl text-black font-bold py-3 px-4 rounded-xl border-2 border-gray-500 hover:bg-gray-400 active:bg-gray-500 transition-colors" // ◀ text-[20px] -> text-xl, py-2 -> py-3, hover/active 효과 추가
                >
                  닫기
                </button>
              )}
            </div>
          </div>
        )}

        {/* 게임 종료 모달 */}
        {showGameOverModal && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-30 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center flex flex-col gap-5 w-full max-w-sm">
              <h3 className="text-3xl font-bold text-gray-900"> 게임 종료! </h3>

              <p className="text-lg text-gray-700">
                총 {TOTAL_QUESTIONS}문제 중에
                <span className="font-bold text-blue-600 text-xl mx-1">{correctCount}</span>
                문제를 맞췄습니다!
              </p>
              <img
                src={
                  correctCount <= 2 ? '/score_bad.jpeg' : correctCount <= 4 ? '/score_normal.jpg' : '/score_good.jpg'
                }
                alt="게임 결과"
                className="w-full object-contain max-h-48 rounded-lg"
              />
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-32 bg-gray-300 font-bold py-2 px-4 rounded-lg border-2 border-gray-500 hover:bg-gray-400 transition-colors" // ◀ transition-colors 추가
                >
                  다시하기
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-32 bg-[#E6E9D8] font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-yellow-100 transition-colors" // ◀ transition-colors 추가
                >
                  홈으로 가기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
