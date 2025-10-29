export default function Footer() {
  return (
    <>
      <ul className="footer absolute right-4 bottom-4 flex gap-3 text-xs text-black md:right-8 md:bottom-8 md:text-sm lg:right-[3.75rem] lg:bottom-[3.125rem] lg:text-base">
        <li className="relative after:absolute after:top-[20%] after:right-[-0.375rem] after:w-[0.0625rem] after:h-[60%] after:bg-current">
          <a href="https://github.com/mudo-labs/mudo-playground" target="_blank" title="ALLMUDO 깃허브 링크 새창열림">
            ALLMUDO
          </a>
        </li>
        <li className="relative after:absolute after:top-[20%] after:right-[-0.375rem] after:w-[0.0625rem] after:h-[60%] after:bg-current">
          <a href="https://github.com/jaehyun0620" target="_blank" title="재현 깃허브 링크 새창열림">
            재현
          </a>
        </li>
        <li className="relative after:absolute after:top-[20%] after:right-[-0.375rem] after:w-[0.0625rem] after:h-[60%] after:bg-current">
          <a href="https://github.com/onewayay" target="_blank" title="한길 깃허브 링크 새창열림">
            한길
          </a>
        </li>
        <li>
          <a href="https://github.com/jjmullan" target="_blank" title="영준 깃허브 링크 새창열림">
            영준
          </a>
        </li>
      </ul>
    </>
  );
}
