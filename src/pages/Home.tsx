import { useEffect, useState } from 'react';
import { app, db } from '../libs/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface dataType {
  id: string;
  title: string;
  description: string;
  imgPath: string;
}

export default function Home() {
  console.log('연결완료', app);
  const [data, setData] = useState<dataType>();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Images'));
      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
        setData(doc.data() as dataType);
      });
    };

    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <h1>홈 페이지 입니다.</h1>
    </>
  );
}
