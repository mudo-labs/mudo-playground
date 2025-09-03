// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDWD_-8YS0ov4ufsb1qOCwn2xHJRQajlzk',
  authDomain: 'mudo-project-9666a.firebaseapp.com',
  projectId: 'mudo-project-9666a',
  storageBucket: 'mudo-project-9666a.firebasestorage.app',
  messagingSenderId: '953204120724',
  appId: '1:953204120724:web:439065152574d205946881',
  measurementId: 'G-2ZC9SXZ9NC',
};

// Initialize Firebase
// 중복 초기화 방지 (HMR 대응)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
console.log('Firebase 연결 성공:', app);
const db = getFirestore(app);

// Analytics는 지원 환경에서만 실행
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) analytics = getAnalytics(app);
  });
}

// 서비스 export
export { app, db };
export { analytics };
