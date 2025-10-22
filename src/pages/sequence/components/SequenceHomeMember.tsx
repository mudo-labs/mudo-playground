const members: string[] = ['길', '정형돈', '정준하', '유재석', '박명수', '하하', '노홍철'];

interface SequenceHomeMemberType {
  onClickChar: (e: React.MouseEvent<HTMLLIElement>) => void;
  selectedChar: string;
}

export default function SequenceHomeMember({ onClickChar, selectedChar }: SequenceHomeMemberType) {
  const memberList = members.map((member: string, i: number) =>
    selectedChar === member ? (
      <li
        key={i}
        className="
          relative cursor-pointer
          font-bold before:absolute before:-top-8 md:before:-top-9 lg:before:-top-10 before:left-1/2 before:-translate-x-1/2 
          before:w-[1.375rem] before:h-[1.5625rem] md:before:w-[1.625rem] md:before:h-[1.875rem] lg:before:w-[1.875rem] lg:before:h-[2.125rem]
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
          hover:font-bold hover:before:absolute hover:before:-top-8 md:hover:before:-top-9 lg:hover:before:-top-10 hover:before:left-1/2 hover:before:-translate-x-1/2 
          hover:before:w-[1.375rem] hoverbefore:h-[1.5625rem] md:hover:before:w-[1.625rem] md:hover:before:h-[1.875rem] lg:hover:before:w-[1.875rem] lg:hover:before:h-[2.125rem]
          hover:before:bg-[url('/images/char/mudori_f.png')] hover:before:bg-cover"
        onClick={onClickChar}
      >
        {member}
      </li>
    ),
  );
  return (
    <div className="relative mt-[8.75rem]">
      <ul className="flex gap-3 text-base md:gap-5 md:text-lg lg:gap-6 lg:text-xl">{memberList}</ul>
      <p className="blink absolute -top-[5rem] right-[3.75rem] translate-x-full -translate-y-full font-bold text-dark-red before:absolute before:bottom-0 before:-translate-x-full before:translate-y-full before:w-5 before:h-[2.3438rem] md:before:w-6 md:before:h-[2.8125rem] before:rotate-45 before:bg-[url('/images/sequence/ico_select_arrow.png')] before:bg-cover text-base md:-top-[5rem] md:-right-[5rem] md:text-xl lg:-top-[6.25rem] lg:-right-[6.25rem] lg:before:w-8 lg:before:h-[3.75rem] lg:text-3xl lg:before:left-2 ">
        멤버 선택!
      </p>
    </div>
  );
}
