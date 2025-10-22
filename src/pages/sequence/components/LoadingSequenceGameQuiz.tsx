export default function LoadingSequenceGameQuiz() {
  return (
    <ul className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:gap-[2rem] mt-8 md:mt-[3.75rem] md:h-[17.5rem] lg:gap-10 lg:mt-20 lg:h-[21.25rem] xl:h-[31.25rem] animate-pulse">
      <li className="flex-1">
        <figure className="flex flex-col justify-between items-center h-full">
          <div className="relative w-full bg-gray-300">
            <div className="h-[9.375rem] md:h-[12.9375rem] lg:h-[16.5rem] xl:h-[26.5rem]"></div>
          </div>
          <figcaption className="font-medium text-center lg:base"></figcaption>
        </figure>
      </li>
      <li className="flex-1">
        <figure className="flex flex-col justify-between items-center h-full">
          <div className="relative w-full bg-gray-400">
            <div className="h-[9.375rem] md:h-[12.9375rem] lg:h-[16.5rem] xl:h-[26.5rem]"></div>
          </div>
          <figcaption className="font-medium text-center lg:base"></figcaption>
        </figure>
      </li>
      <li className="flex-1">
        <figure className="flex flex-col justify-between items-center h-full">
          <div className="relative w-full bg-gray-300">
            <div className="h-[9.375rem] md:h-[12.9375rem] lg:h-[16.5rem] xl:h-[26.5rem]"></div>
          </div>
          <figcaption className="font-medium text-center lg:base"></figcaption>
        </figure>
      </li>
    </ul>
  );
}
