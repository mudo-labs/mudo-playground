interface ButtonType {
  children: string;
  type: 'button' | 'submit';
  size: 'sm' | 'lg';
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, type, size, onClick, className }: ButtonType) {
  const btnSize = {
    sm: 'px-5 py-2 text-xs md:px-7 md:py-2.5 md:text-sm lg:px-8 lg:py-3 lg:text-base',
    lg: 'px-[2.5rem] py-2 text-lg md:px-[3.75rem] md:py-2.5 md:text-xl lg:px-[4.375rem] lg:py-3.5 lg:text-2xl',
  };
  return (
    <button
      type={type}
      className={`${btnSize[size]} border-[0.125rem] border-black rounded-xl font-bold bg-light-yellow ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
