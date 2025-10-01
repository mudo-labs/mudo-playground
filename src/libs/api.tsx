// Firestore에서 사진 데이터 한 번만 가져오는 커스텀 훅
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface Images {
  id: string;
  imgPath: string;
  title: string;
  tags: string[];
  cast: string[];
  keyword: string;
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Images[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Images'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Images[];
        setPhotos(data);
      } catch (err) {
        console.error('사진 데이터 가져오기 실패:', err);
        setError('알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}

/**
 * 이 파일 구조와 사용법 안내:
 *
 * 1. firebase.ts
 *    - Firebase 프로젝트 초기화
 *    - Firestore 인스턴스를 export하여 다른 파일에서 사용 가능
 *    - 사용자가 자신의 Firebase 설정값(apiKey 등)을 입력해야 함
 *
 * 2. api.tsx
 *    - 무도 Firestore의 'Images' 컬렉션에서 사진 데이터를 한 번만 가져오는 커스텀 훅
 *    - React 컴포넌트에서 데이터를 쉽게 가져오기 위해 useState, useEffect 사용
 *    - 반환값:
 *        photos: Images[]       → 사진 배열
 *        loading: boolean      → 데이터 로딩 상태
 *        error: string | null  → 오류 상태
 *    - 특징:
 *        - getDocs() 사용 → 실시간 업데이트 필요 없을 때
 *        - 로딩, 오류, 빈 데이터 처리 포함
 *        - TypeScript 타입 정의로 안전하게 사용 가능
 *
 *
 * 🔹 사용법 요약
 *    1) Firebase 콘솔에서 프로젝트 생성 후 설정값(firebaseConfig) 입력
 *    2) Firestore에서 'Images' 컬렉션 생성
 *       - 필드 예시: url (string), title (string, 선택)
 *    3) 필요 시 컬렉션 이름/필드명만 변경하면 다른 데이터에도 재사용 가능
 *
 *
 */
