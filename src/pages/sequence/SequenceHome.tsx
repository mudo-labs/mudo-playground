import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SequenceHomeText from './components/SequenceHomeText';
import SequenceHomeMember from './components/SequenceHomeMember';

export default function SequenceHome() {
  const navigate = useNavigate();
  const [selectedChar, setSelectedChar] = useState<string>(''); // 선택된 멤버 상태

  const onClickChar = (e: React.MouseEvent<HTMLLIElement>) => {
    // 선택 멤버 상태 변환 이벤트 함수
    const clickedChar = e.currentTarget.textContent || '';
    setSelectedChar(clickedChar);
  };

  return (
    <div className="mx-auto min-h-dvh flex flex-col justify-center items-center w-full px-4 md:px-8 lg:px-0 lg:max-w-[68.75rem] xl:max-w-[120rem]">
      <SequenceHomeText />
      <SequenceHomeMember onClickChar={onClickChar} selectedChar={selectedChar} />
      <Button
        type="button"
        size="lg"
        className="mt-[5rem] md:mt-[6.25rem] lg:mt-[7.5rem]"
        onClick={() => {
          if (selectedChar === '') {
            alert('멤버를 선택해주세요!');
          } else {
            navigate('/sequenceGame', { state: { selectedChar } });
          }
        }}
      >
        순서 맞추기 출바알
      </Button>
    </div>
  );
}
