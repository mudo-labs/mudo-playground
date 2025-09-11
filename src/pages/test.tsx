import { useEffect, useState } from 'react';

// 맵 데이터 (0: 길, 1: 벽)
const map = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0],
];

// 방향키 입력에 따른 좌표 변화
const directions: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

// 타일 크기(px)
const TILE_SIZE = 40;

export default function Test() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [moving, setMoving] = useState(false); // 이동 중인지 체크

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (moving) return; // 이동 중이면 무시
      const dir = directions[e.key];
      if (!dir) return;

      const [dx, dy] = dir;
      const [x, y] = position;
      const newX = x + dx;
      const newY = y + dy;

      // 맵 경계 및 벽 체크
      if (newY >= 0 && newY < map.length && newX >= 0 && newX < map[0].length && map[newY][newX] === 0) {
        setMoving(true);

        // 부드럽게 이동 (pixel offset)
        let step = 0;
        const steps = 10; // 10 frame animation
        const interval = setInterval(() => {
          step++;
          setOffset([dx * (step / steps), dy * (step / steps)]);
          if (step === steps) {
            clearInterval(interval);
            setPosition([newX, newY]);
            setOffset([0, 0]);
            setMoving(false);
          }
        }, 20); // 20ms 간격 → 약 200ms 이동
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, moving]);

  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: map[0].length * TILE_SIZE,
          height: map.length * TILE_SIZE,
          border: '2px solid black',
        }}
      >
        {map.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                position: 'absolute',
                left: x * TILE_SIZE,
                top: y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor: cell === 1 ? 'black' : 'white',
                border: '1px solid gray',
              }}
            />
          )),
        )}

        {/* 캐릭터 예시 레드 박스로 표시했습니다. */}
        <div
          style={{
            position: 'absolute',
            width: TILE_SIZE,
            height: TILE_SIZE,
            left: position[0] * TILE_SIZE + offset[0] * TILE_SIZE,
            top: position[1] * TILE_SIZE + offset[1] * TILE_SIZE,
            backgroundColor: 'red',
            transition: 'left 0.2s linear, top 0.2s linear',
          }}
        />
      </div>
    </div>
  );
}
