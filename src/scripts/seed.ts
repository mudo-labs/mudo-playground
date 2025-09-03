// scripts/seed.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDWD_-8YS0ov4ufsb1qOCwn2xHJRQajlzk',
  authDomain: 'mudo-project-9666a.firebaseapp.com',
  projectId: 'mudo-project-9666a',
  storageBucket: 'mudo-project-9666a.firebasestorage.app',
  messagingSenderId: '953204120724',
  appId: '1:953204120724:web:439065152574d205946881',
  measurementId: 'G-2ZC9SXZ9NC',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 더미 데이터
const dummyData = [
  {
    title: '약간 모자라지만 착한 친구야',
    description: '멍청이를 우리말로 순화해서 말하는 장면',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-002.png?raw=true',
    cast: ['정준하'],
    tags: ['웃김', '놀림', '디스'],
  },
  {
    title: '정신차려 이 각박한 세상속에서',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-003.png?raw=true',
    cast: ['하하'],
    tags: ['웃김', '경고', '설득', '자막짤'],
  },
  {
    title: '지금 지쳤나요?',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-004.png?raw=true',
    cast: ['홍진경'],
    tags: ['웃김', '힘듦', '피곤', '자막짤'],
  },
  {
    title: '사랑아, 보영해',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-005.png?raw=true',
    cast: ['정형돈', '일반인'],
    tags: ['웃김', '사랑', '자막짤'],
  },
  {
    title: '형이 왜 거기서 나와?',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-006.png?raw=true',
    cast: ['정형돈'],
    tags: ['웃김', '왜 거기서 나와', '당황', '자막짤'],
  },
  {
    title: '출바알',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-007.png?raw=true',
    cast: ['박명수'],
    tags: ['출발', '여행', '자막짤'],
  },
  {
    title: '정자룡이 간다 간다 뿅 간다',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-008.png?raw=true',
    cast: ['박명수', '정준하', '길'],
    tags: ['웃김', '가자', '자막짤'],
  },
  {
    title: '늦었다고 생각할 때가 진짜 너무 늦었다',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-009.png?raw=true',
    cast: ['박명수'],
    tags: ['충고', '늦음', '공부', '지각'],
  },
  {
    title: '꿈은 없고요 그냥 놀고 싶습니다',
    description: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-010.png?raw=true',
    imgPath: '',
    cast: ['무도멤버'],
    tags: ['지침', '공부', '놀자', '쉬자'],
  },
  {
    title: '나 드러워서 못하겠네',
    description: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-011.png?raw=true',
    imgPath: '',
    cast: ['박명수', '정준하'],
    tags: ['', '', ''],
  },
  {
    title: '말 좀 제대로 해라',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-012.png?raw=true',
    cast: ['하하', '정형돈'],
    tags: ['', '', ''],
  },
  {
    title: '일본 형돈이',
    description: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-013.png?raw=true',
    imgPath: '',
    cast: ['정준하'],
    tags: ['', '', ''],
  },
  {
    title: '유식해 보이는 무식한 답변',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-014.png?raw=true',
    cast: ['하하'],
    tags: ['', '', ''],
  },
  {
    title: '아버지 나를 낳으시고 바지적삼 다적시셨네',
    description: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-015.png?raw=true',
    imgPath: '',
    cast: ['정준하', '박명수', '유재석'],
    tags: ['', '', ''],
  },
  {
    title: '뱀이야 xx야',
    description: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-016.png?raw=true',
    imgPath: '',
    cast: ['길', '정형돈'],
    tags: ['', '', ''],
  },
  {
    title: '점 오',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-017.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '한머리 두냄새',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-018.png?raw=true',
    cast: ['유재석', '정형돈', '박명수', '하하', '정준하', '길'],
    tags: ['', '', ''],
  },
  {
    title: '간염에 걸렸을때 일어나지 못했더라면',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-019.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '이제는 더 이상 물러날 곳이 없다',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-020.png?raw=true',
    cast: ['정준하'],
    tags: ['', '', ''],
  },
  {
    title: '형보다 잘할걸?',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-021.png?raw=true',
    cast: ['길'],
    tags: ['', '', ''],
  },
  {
    title: '아유... 하기 싫어...',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-022.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '참재밌다',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-023.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '자 이게 클릭이야',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-024.png?raw=true',
    cast: ['노홍철', '하하'],
    tags: ['', '', ''],
  },
  {
    title: '형이 모자라다고 말 함부로 하냐',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-025.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '그래도 하시겠습니까?',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-026.png?raw=true',
    cast: ['일반인'],
    tags: ['', '', ''],
  },
  {
    title: '반갑다 x세대 여러분',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-027.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '무야호',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-028.png?raw=true',
    cast: ['일반인'],
    tags: ['', '', ''],
  },
  {
    title: '더덩실 더덩실',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-029.png?raw=true',
    cast: ['유재석', '박명수'],
    tags: ['', '', ''],
  },
  {
    title: '지난번만 못하네요 어머님',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-030.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '법보다 가까운 주먹',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-031.png?raw=true',
    cast: ['박명수', '유재석', '정준하', '정형돈'],
    tags: ['', '', ''],
  },
  {
    title: '친구들아 고맙다',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-032.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '한번 고소당해야 정신 차리시겠습니까',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-033.png?raw=true',
    cast: ['박명수'],
    tags: ['', '', ''],
  },
  {
    title: '홍철이 없는 홍철팀 탄생',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-034.png?raw=true',
    cast: ['길', '유재석', '정준하', '하하', '박명수'],
    tags: ['', '', ''],
  },
  {
    title: '족발 당수 워어어어',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-035.png?raw=true',
    cast: ['정형돈'],
    tags: ['', '', ''],
  },
  {
    title: '쯔왑 쯔왑',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-036.png?raw=true',
    cast: ['황광희'],
    tags: ['', '', ''],
  },
  {
    title: '너 왜 반말?',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-037.png?raw=true',
    cast: ['유병재'],
    tags: ['', '', ''],
  },
  {
    title: '참... 좋다',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-038.png?raw=true',
    cast: ['정준하'],
    tags: ['', '', ''],
  },
  {
    title: '성희롱 당한 NO홍철',
    description: '',
    imgPath: 'https://github.com/jaehyun0620/mudo-images/blob/main/images/mudo-039.png?raw=true',
    cast: ['노홍철'],
    tags: ['', '', ''],
  },
];

const seed = async () => {
  for (const item of dummyData) {
    await addDoc(collection(db, 'Images'), item);
  }
  console.log(' Firestore에 더미 데이터가 추가되었습니다.');
};

seed();
