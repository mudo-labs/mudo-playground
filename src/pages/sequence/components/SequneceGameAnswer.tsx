import Button from '../../../components/ui/Button';
import CustomLink from '../../../components/ui/CustomLink';

interface SequneceGameAnswerType {
  isSolving: boolean;
  isCorrect: boolean;
  round: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  submitAnswer: React.MutableRefObject<string>;
  onClickSumbit: () => void;
  onClickNext: () => void;
  answerNum: string;
  correctNum: number;
}

export default function SequenceGameAnswer({
  isSolving,
  isCorrect,
  inputRef,
  submitAnswer,
  onClickSumbit,
  onClickNext,
  answerNum,
  correctNum,
  round,
}: SequneceGameAnswerType) {
  return (
    <>
      {isSolving ? (
        <div className="flex justify-center items-center mt-10 gap-5 md:mt-[6.25rem] md:gap-6 lg:mt-[9.375rem] lg:gap-7.5">
          <input
            type="text"
            ref={inputRef}
            defaultValue={submitAnswer.current}
            onChange={e => (submitAnswer.current = e.target.value)}
            className="border border-black w-[18.75rem] h-[2.375rem] text-xs px-3 rounded-xl md:w-[21.25rem] md:h-[2.75rem] md:px-4 md:text-sm lg:w-[22.5rem] lg:h-12 lg:text-base"
            placeholder="순서에 맞게 숫자만 입력해주세요. ex)123"
            maxLength={3}
          />
          <Button type="submit" styling="normal" size="sm" onClick={onClickSumbit}>
            제출
          </Button>
        </div>
      ) : !isSolving && round === 5 ? (
        <div className="flex flex-col items-center gap-3 mt-5 md:gap-4 md:mt-12 lg:mt-16 lg:gap-6">
          <p className="text-xs md:text-sm lg:text-base">{isCorrect ? '정답!' : '오답!'}</p>
          <strong className="text-xs md:text-sm lg:text-base">
            {answerNum[0]} -&gt; {answerNum[1]} -&gt; {answerNum[2]}
          </strong>
          <CustomLink to="/sequenceEnd" size="sm" state={{ correctNum }}>
            결과보기
          </CustomLink>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 mt-5 md:gap-4 md:mt-12 lg:mt-16 lg:gap-6">
          <p className="text-xs md:text-sm lg:text-base">{isCorrect ? '정답!' : '오답!'}</p>
          <strong className="text-xs md:text-sm lg:text-base">
            {answerNum[0]} -&gt; {answerNum[1]} -&gt; {answerNum[2]}
          </strong>
          <Button type="button" styling="normal" size="sm" onClick={onClickNext}>
            다음
          </Button>
        </div>
      )}
    </>
  );
}
