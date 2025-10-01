import { useLocation } from 'react-router-dom';
import { usePhotos } from '../../libs/api';
import { useMemo, useRef, useState } from 'react';

// 배열 랜덤으로 섞기
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function SequenceGame() {
  const location = useLocation();
  const selectedChar: string = location.state.selectedChar; // SequenceHome 에서 선택된 멤버

  const { photos, loading, error } = usePhotos(); // 데이터 불러오기
  console.log(loading, error);
  const [picNum, setPicNum] = useState(0); // 필터링 된 데이터 몇부터 몇까지 자를지 상태

  // 선택된 멤버로 데이터 필터링 후 shuffle로 랜덤하게 섞기
  const filteredPhotos = useMemo(() => {
    const f = photos?.filter(photo => photo.cast.includes(selectedChar)) ?? [];
    return shuffle(f);
  }, [photos, selectedChar]);

  const currentPhotos = filteredPhotos.slice(picNum, picNum + 3); // 필터링된 데이터에서 보여줄 사진 3개 자르기

  const answer = [...currentPhotos].sort((a, b) => a.episodeNum - b.episodeNum); // 정답 순서대로의 배열

  // currentPhotos에서의 위치를 answer 배열 기준으로 숫자로 변환
  const answerNum = answer
    .map(item => {
      return currentPhotos.findIndex(c => c.episodeNum === item.episodeNum) + 1;
    })
    .join('');
  console.log('answer', answer);
  console.log('answerNum', answerNum);

  const [round, setRound] = useState(0); // 현재 라운드
  const [isSolving, setIsSolving] = useState(true); // 문제 푸는 중인지 (true면 문제 푸는중, false면 답변 제출 상태)
  const [isCorrect, setIsCorrect] = useState(true);

  const submitAnswer = useRef(''); // 답변 input 내용

  const onClickSumbit = () => {
    setIsSolving(false);
    if (answerNum === submitAnswer.current) {
      // alert('맞혔습니다');
      setIsCorrect(true);
    } else {
      // alert('틀렸습니다.');
      setIsCorrect(false);
    }
  };

  const onClickNext = () => {
    setPicNum(picNum + 3);
    setIsSolving(true);
    setRound(round + 1);
  };

  const questionList = currentPhotos.map((item, i) => {
    // 사진 3장 li로 삽입
    if (isSolving === true) {
      // 문제 푸는 중
      return (
        <li key={i} className="flex-1">
          <figure className="flex flex-col justify-between items-center h-full lg:gap-7">
            <div className="relative">
              <img src={item.imgPath} alt={`${i + 1}번 문제 사진`} />
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-center content-center bg-dark-red font-medium text-white lg:w-7 lg:h-7 lg:text-base">
                {i + 1}
              </span>
            </div>
            <figcaption className="font-medium text-center lg:base"></figcaption>
          </figure>
        </li>
      );
    } else {
      // 답변 제출 상태 (답(회차정보) 표출)
      return (
        <li key={i} className="flex-1">
          <figure className="flex flex-col justify-between items-center h-full lg:gap-7">
            <div className="relative">
              <img src={item.imgPath} alt={`${i + 1}번 문제 사진`} />
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-center content-center bg-dark-red font-medium text-white lg:w-7 lg:h-7 lg:text-base">
                {i + 1}
              </span>
            </div>
            <figcaption className="font-medium text-center lg:base">
              <p>
                {item.episodeNum}회 ({item.episodeDate})
              </p>
              <strong className="font-medium">{item.episodeName}</strong>
            </figcaption>
          </figure>
        </li>
      );
    }
  });

  return (
    <div className="mx-auto min-h-dvh lg:pt-[170px] lg:max-w-[68.75rem] xl:max-w-[120rem]">
      <ul className="flex lg:gap-2">
        <li key="1" className="aspect-square bg-dark-red rounded-full lg:w-3"></li>
        <li key="2" className="aspect-square bg-light-gray2 rounded-full lg:w-3"></li>
        <li key="3" className="aspect-square bg-light-gray2 rounded-full lg:w-3"></li>
        <li key="4" className="aspect-square bg-light-gray2 rounded-full lg:w-3"></li>
        <li key="5" className="aspect-square bg-light-gray2 rounded-full lg:w-3"></li>
      </ul>
      <ul className="flex items-stretch justify-between lg:gap-[40px] lg:mt-20">{questionList}</ul>

      {isSolving ? (
        <div className="flex justify-center items-center lg:mt-[9.375rem] lg:gap-[1.875rem]">
          <input
            type="text"
            defaultValue={submitAnswer.current}
            onChange={e => (submitAnswer.current = e.target.value)}
            className="border border-black lg:w-[360px] lg:h-12 lg:px-4"
            placeholder="순서에 맞게 숫자만 입력해주세요. ex)123"
          />
          <button
            type="button"
            className="border-[0.125rem] border-black rounded-xl font-bold bg-light-yellow lg:px-8 lg:py-3 lg:text-base"
            onClick={onClickSumbit}
          >
            제출
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center lg:mt-20 lg:gap-6">
          <p>{isCorrect ? '정답!' : '오답!'}</p>
          <strong>
            {answerNum[0]} -&gt; {answerNum[1]} -&gt; {answerNum[2]}
          </strong>
          <button
            type="button"
            className="border-[0.125rem] border-black rounded-xl font-bold bg-light-yellow lg:px-8 lg:py-3 lg:text-base"
            onClick={onClickNext}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
