export default function SequenceGameRound({ round }: { round: number }) {
  const roundCircles = [1, 2, 3, 4, 5].map(num => (
    <li
      key={num}
      className={`rounded-full ${round === num ? 'bg-dark-red w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3 lg:h-3' : 'bg-light-gray2 w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2 lg:h-2'}`}
    ></li>
  ));
  return <ul className="flex items-center gap-1.5 md:gap-2">{roundCircles}</ul>;
}
