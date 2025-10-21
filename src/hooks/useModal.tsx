import { useState } from 'react';
import Button from '../components/ui/Button';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openModal = (text: string) => {
    setIsOpen(true);
    setMessage(text);
  };
  const closeModal = () => setIsOpen(false);

  const Modal = () =>
    isOpen ? (
      <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-[1000]">
        <div className="relative w-[20.5rem] h-[15rem] px-5 py-[4.25rem] text-center bg-[url('/src/assets/common/modal_bg.png')] bg-cover md:w-[26.875rem] md:h-[19.625rem] md:px-10 md:py-[5.5rem] lg:w-[31.25rem] lg:h-[22.875rem] lg:px-12 lg:py-[6.75rem]">
          <h3 className="font-bold text-base md:text-xl lg:text-2xl">{message}</h3>
          <Button
            type="button"
            styling="modal"
            size="sm"
            onClick={closeModal}
            className="absolute left-1/2 bottom-[4.25rem] -translate-x-1/2 md:bottom-[5.5rem] lg:bottom-[6.75rem]"
          >
            확인
          </Button>
        </div>
      </div>
    ) : null;

  return { openModal, closeModal, Modal };
}
