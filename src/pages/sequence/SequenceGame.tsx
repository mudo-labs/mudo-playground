import { useLocation } from 'react-router-dom';
import { usePhotos, type Images } from '../../libs/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import SequenceGameRound from './components/SequenceGameRound';
import SequenceGameQuiz from './components/SequenceGameQuiz';
import SequenceGameAnswer from './components/SequneceGameAnswer';
import LoadingSequenceGameQuiz from './components/LoadingSequenceGameQuiz';

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

  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩중 상태

  const { photos, loading } = usePhotos(); // 데이터 불러오기

  useEffect(() => {
    // 로딩중 상태 변경
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  const [picNum, setPicNum] = useState(0); // 필터링 된 데이터 몇부터 몇까지 자를지 상태

  // 선택된 멤버로 데이터 필터링 후 shuffle로 랜덤하게 섞기
  const filteredPhotos = useMemo(() => {
    const f = photos?.filter(photo => photo.cast.includes(selectedChar)) ?? [];
    return shuffle(f);
  }, [photos, selectedChar]);

  let currentPhotos: Images[] = filteredPhotos.slice(picNum, picNum + 3); // 필터링된 데이터에서 보여줄 사진 3개 자르기

  if (currentPhotos.length === 3) {
    const [fisrt, second, third] = currentPhotos;

    // 1번 2번이 같으면 1번을 맨뒤로
    // target은 뒤로 넘길 대상
    if (fisrt.episodeNum === second.episodeNum) {
      const target = filteredPhotos[picNum];
      filteredPhotos.splice(picNum, 1);
      filteredPhotos.push(target);
      currentPhotos = filteredPhotos.slice(picNum, picNum + 3);
    }
    // 2번 3번이 같으면 2번을 맨뒤로
    else if (second.episodeNum === third.episodeNum) {
      const target = filteredPhotos[picNum + 1];
      filteredPhotos.splice(picNum + 1, 1);
      filteredPhotos.push(target);
      currentPhotos = filteredPhotos.slice(picNum, picNum + 3);
    }
    // 1번 3번이 같으면 1번을 맨뒤로
    else if (fisrt.episodeNum === third.episodeNum) {
      const target = filteredPhotos[picNum];
      filteredPhotos.splice(picNum, 1);
      filteredPhotos.push(target);
      currentPhotos = filteredPhotos.slice(picNum, picNum + 3);
    }
  }

  const answer = [...currentPhotos].sort((a, b) => a.episodeNum - b.episodeNum); // 정답 순서대로의 배열

  // currentPhotos에서의 위치를 answer 배열 기준으로 숫자로 변환
  const answerNum = answer
    .map(item => {
      return currentPhotos.findIndex(c => c.episodeNum === item.episodeNum) + 1;
    })
    .join('');

  const [round, setRound] = useState(1); // 현재 라운드
  const [isSolving, setIsSolving] = useState(true); // 문제 푸는 중인지 (true면 문제 푸는중, false면 답변 제출 상태)
  const [isCorrect, setIsCorrect] = useState(true); // 맞았는지 틀렸는지
  const [correctNum, setCorrectNum] = useState(0); // 몇개 맞았는지

  const submitAnswer = useRef<string>(''); // 답변 input 내용
  const inputRef = useRef<HTMLInputElement | null>(null); // input DOM 관리

  const onClickSumbit = () => {
    setIsSolving(false);
    if (answerNum === submitAnswer.current) {
      // alert('맞혔습니다');
      setIsCorrect(true);
      setCorrectNum(correctNum + 1);
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

  // isSolving이 바뀔때마다 input clear 및 focus
  useEffect(() => {
    submitAnswer.current = '';
    inputRef.current?.focus();
  }, [isSolving]);

  // 다음 라운드 이미지 미리 받아 놓기
  useEffect(() => {
    const nextPhotos = filteredPhotos.slice(picNum + 3, picNum + 6);
    nextPhotos.forEach(photo => {
      const img = new Image();
      img.src = photo.imgPath; // 캐시에 미리 로드
    });
  }, [picNum, filteredPhotos]);

  return (
    <div className="mx-auto min-h-dvh w-full px-4 pt-[5rem] pb-[2.5rem] md:pt-[9.375rem] md:pb-[4.375rem] md:px-8 lg:px-0 lg:pt-[10.625rem] lg:pb-[6.25rem] lg:max-w-[68.75rem] xl:max-w-[120rem]">
      <SequenceGameRound round={round} />
      {isLoading ? (
        <LoadingSequenceGameQuiz />
      ) : (
        <SequenceGameQuiz isSolving={isSolving} currentPhotos={currentPhotos} />
      )}
      <SequenceGameAnswer
        isSolving={isSolving}
        isCorrect={isCorrect}
        round={round}
        inputRef={inputRef}
        submitAnswer={submitAnswer}
        onClickSumbit={onClickSumbit}
        onClickNext={onClickNext}
        answerNum={answerNum}
        correctNum={correctNum}
      />
    </div>
  );
}
