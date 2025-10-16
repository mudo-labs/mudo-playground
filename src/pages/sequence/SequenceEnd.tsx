import { useLocation } from 'react-router-dom';
import CustomLink from '../../components/ui/CustomLink';

export default function SequenceEnd() {
  const location = useLocation();
  const { correctNum }: { correctNum: number } = location.state; // 넘겨받은 정답 맞춘 수

  let resultText: string; // 점수에 따라 보여지는 텍스트
  let resultImgSrc: string; // 점수에 따라 보여지는 이미지 src
  switch (correctNum) {
    case 1:
      resultText = '당신에게 실망입니다. 조금 더 분발해서 문제를 풀어보세요!';
      resultImgSrc = 'images/sequence/result-img-1.jpg';
      break;
    case 2:
      resultText = '약간... 모자라지만 착한 친구로 임명합니다.';
      resultImgSrc = 'images/sequence/result-img-2.jpg';
      break;
    case 3:
      resultText = '세상은 1등만 기억합니다. 다시 도전해서 1등을 노려보세요.';
      resultImgSrc = 'images/sequence/result-img-3.jpg';
      break;
    case 4:
      resultText = 'Very Good! 다시 도전해서 만점을 노려보세요!';
      resultImgSrc = 'images/sequence/result-img-4.jpg';
      break;
    case 5:
      resultText = '이걸 어떻게 다 맞춰요? 아무튼 100점 드립니다. 최고!';
      resultImgSrc = 'images/sequence/result-img-5.jpg';
      break;
    default: // 0 일 경우
      resultText = '💀 명수옹의 호통 💀';
      resultImgSrc = 'images/sequence/result-img-0.jpg';
  }
  return (
    <div className="mx-auto min-h-dvh flex flex-col justify-center items-center gap-[1.875rem] md:gap-[2.5rem] w-full px-4 md:px-8 lg:px-0 lg:max-w-[68.75rem] lg:gap-[3.125rem] xl:max-w-[120rem]">
      <img src={resultImgSrc} alt="결과 이미지" className="max-h-[25rem] md:max-h-[28.125rem] lg:max-h-[31.25rem]" />
      <div className="text-center">
        <strong className="font-normal lg:text-xl">
          5문제 중 <span className="font-bold text-dark-red">{correctNum}개</span> 맞혔습니다.
        </strong>
        <p className="mt-2 text-sm md:mt-3 md:text-base lg:text-lg">{resultText}</p>
      </div>
      <div className="flex gap-4 md:gap-6 lg:gap-7">
        <CustomLink to="/" size="sm">
          홈으로
        </CustomLink>
        <CustomLink to="/sequenceHome" size="sm">
          다시 도전
        </CustomLink>
      </div>
    </div>
  );
}
