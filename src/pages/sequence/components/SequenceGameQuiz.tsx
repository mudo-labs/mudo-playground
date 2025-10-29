import type { Images } from '../../../libs/api';

interface SequenceGameQuizType {
  currentPhotos: Images[];
  isSolving: boolean;
}

export default function SequenceGameQuiz({ currentPhotos, isSolving }: SequenceGameQuizType) {
  const quizList = currentPhotos.map((item, i) => {
    // 사진 3장 li로 삽입
    if (isSolving === true) {
      // 문제 푸는 중
      return (
        <li key={i} className="flex-1">
          <figure className="flex flex-col justify-between items-start h-[19vh] md:items-center md:h-[40vh]">
            <div className="relative max-h-full md:max-h-[calc(100%-4.5625rem)] xl:max-h-[calc(100%-4.75rem)]">
              <img
                src={item.imgPath}
                alt={`${i + 1}번 문제 사진`}
                className="w-full md:w-auto h-full max-h-full object-contain"
              />
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-center content-center bg-dark-red font-medium text-white text-xs md:w-6 md:h-6 md:text-sm lg:w-7 lg:h-7 lg:text-base">
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
          <figure className="flex flex-row justify-between items-center gap-2 h-[19vh] md:flex-col md:gap-7 md:h-[40vh]">
            <div className="relative w-[60%] h-full max-h-full md:w-auto md:max-h-[calc(100%-4.5625rem)] xl:max-h-[calc(100%-4.75rem)]">
              <img
                src={item.imgPath}
                alt={`${i + 1}번 문제 사진`}
                className="max-h-full md:max-h-auto max-w-full md:max-w-auto object-contain"
              />
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-center content-center bg-dark-red font-medium text-white text-xs md:w-6 md:h-6 md:text-sm lg:w-7 lg:h-7 lg:text-base">
                {i + 1}
              </span>
            </div>
            <figcaption className="w-[40%] font-medium text-center leading-[1.2] md:w-auto md:leading-normal">
              <p className="text-xs md:text-sm lg:text-base">
                {item.episodeNum}회 ({item.episodeDate})
              </p>
              <strong className="font-medium text-xs md:text-sm lg:text-base">{item.episodeName}</strong>
            </figcaption>
          </figure>
        </li>
      );
    }
  });
  return (
    <ul className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:gap-[2rem] mt-8 md:mt-[3.75rem] lg:mt-[3rem] xl:mt-20">
      {quizList}
    </ul>
  );
}
