import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const members: string[] = ['길', '정형돈', '정준하', '유재석', '박명수', '하하', '노홍철'];

export default function SequenceHome() {
  const navigate = useNavigate();
  const [selectedChar, setSelectedChar] = useState<string>(''); // 선택된 멤버 상태

  const onClickChar = (e: React.MouseEvent<HTMLLIElement>) => {
    // 선택 멤버 상태 변환 이벤트 함수
    const clickedChar = e.currentTarget.textContent || '';
    setSelectedChar(clickedChar);
  };
  console.log(selectedChar);

  const memberList = useMemo(() => {
    return members.map((member: string, i: number) =>
      selectedChar === member ? (
        <li
          key={i}
          className="
          relative cursor-pointer
          font-bold before:absolute before:-top-10 before:left-1/2 before:-translate-x-1/2 lg:before:w-[1.875rem] lg:before:h-[2.125rem]
          before:bg-[url('/images/char/mudori_f.png')] before:bg-cover"
          onClick={onClickChar}
        >
          {member}
        </li>
      ) : (
        <li
          key={i}
          className="
          relative cursor-pointer
          hover:font-bold hover:before:absolute hover:before:-top-10 hover:before:left-1/2 hover:before:-translate-x-1/2 lg:hover:before:w-[1.875rem] lg:hover:before:h-[2.125rem]
          hover:before:bg-[url('/images/char/mudori_f.png')] hover:before:bg-cover"
          onClick={onClickChar}
        >
          {member}
        </li>
      ),
    );
  }, [selectedChar]);

  return (
    // inner
    <div className="mx-auto min-h-dvh flex flex-col justify-center items-center lg:max-w-[68.75rem] xl:max-w-[120rem]">
      <div className="text-center">
        <h2 className="font-bold lg:text-[3.75rem]">무도 짤 순서 맞추기 게임</h2>
        <p className="leading-[1.6] lg:mt-6 lg:text-xl">
          화면의 보여지는 짤들을 회차 순으로 정렬해보세요!
          <br />
          (오래된 회차 -&gt; 최신 회차)
        </p>
      </div>
      <div className="relative lg:mt-[8.75rem]">
        <ul className="flex  lg:gap-6 lg:text-xl">{memberList}</ul>
        <p className="blink absolute translate-x-full -translate-y-full font-bold text-dark-red before:absolute before:bottom-0 before:-translate-x-full before:translate-y-full before:w-[32px] before:h-[60px] before:rotate-45 before:bg-[url('/images/sequence/ico_select_arrow.png')] before:bg-cover lg:-top-[100px] lg:-right-[100px] lg:text-3xl lg:before:left-2 ">
          멤버 선택!
        </p>
      </div>

      <button
        type="button"
        className="border-[0.125rem] border-black rounded-xl font-bold bg-light-yellow lg:mt-[7.5rem] lg:px-[4.375rem] lg:py-3.5 lg:text-2xl"
        onClick={() => {
          if (selectedChar === '') {
            alert('a');
          } else {
            navigate('/sequenceGame', { state: { selectedChar } });
          }
        }}
      >
        순서 맞추기 출바알
      </button>
    </div>
  );
}
