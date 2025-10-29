interface ButtonType {
  children: string;
  type: 'button' | 'submit';
  styling: 'normal' | 'modal';
  size: 'sm' | 'lg';
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, type, styling, size, onClick, className }: ButtonType) {
  const btnSize = {
    sm: 'px-5 py-2 text-xs md:px-7 md:py-2.5 md:text-sm lg:px-8 lg:py-3 lg:text-base',
    lg: 'px-[2.5rem] py-2 text-lg md:px-[3.75rem] md:py-2.5 md:text-xl lg:px-[4.375rem] lg:py-3.5 lg:text-2xl',
  };

  const btnSytle = {
    normal: 'border-black text-black bg-light-yellow',
    modal: 'border-[#4C353F] text-white bg-[#7F7377]',
  };
  return (
    <button
      type={type}
      className={`${btnSize[size]} ${btnSytle[styling]} border-[0.125rem] rounded-xl font-bold ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
