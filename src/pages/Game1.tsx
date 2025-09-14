export default function Game1() {
  return (
    <>
      <div className="bg-yellow-200 min-w-[360px] min-h-screen">
        <h1 className="text-[36px] text-center">없는 게 없는 무도 게임</h1>
        <p className="text-[16px] text-center">선택한 캐릭터와 관련된 짤을 보고 정답을 맞혀보세요!</p>
        <div className="flex justify-between pl-2 pr-2">
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
          <div className="w-[48px] h-[93px] bg-blue-500"></div>
        </div>
        <button>퀴즈 출바알</button>
      </div>
    </>
  );
}
