export default function LoadingSequenceGameQuiz() {
  return (
    <ul className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:gap-[2rem] mt-8 md:mt-[3.75rem] lg:mt-[3rem] xl:mt-20 animate-pulse">
      <li className="flex-1">
        <figure className="flex flex-col justify-between items-start h-[19vh] md:items-center md:h-[40vh]">
          <div className="relative max-h-full md:max-h-[calc(100%-4.5625rem)] xl:max-h-[calc(100%-4.75rem)] w-full h-full bg-gray-300">
            <div className="w-full md:w-auto h-full max-h-full object-contain"></div>
          </div>
          <figcaption className="font-medium text-center lg:base"></figcaption>
        </figure>
      </li>
      <li className="flex-1">
        <figure className="flex flex-col justify-between items-start h-[19vh] md:items-center md:h-[40vh]">
          <div className="relative max-h-full md:max-h-[calc(100%-4.5625rem)] xl:max-h-[calc(100%-4.75rem)] w-full h-full bg-gray-400">
            <div className="w-full md:w-auto h-full max-h-full object-contain"></div>
          </div>
          <figcaption className="font-medium text-center lg:base"></figcaption>
        </figure>
      </li>
      <li className="flex-1">
        <figure className="flex flex-col justify-between items-start h-[19vh] md:items-center md:h-[40vh]">
          <div className="relative max-h-full md:max-h-[calc(100%-4.5625rem)] xl:max-h-[calc(100%-4.75rem)] w-full h-full bg-gray-300">
            <div className="w-full md:w-auto h-full max-h-full object-contain"></div>
          </div>
          <figcaption className="font-medium text-center lg:base"></figcaption>
        </figure>
      </li>
    </ul>
  );
}
