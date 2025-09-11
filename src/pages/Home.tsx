import { usePhotos } from '../libs/api';

export default function Home() {
  const { photos, loading, error } = usePhotos();
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (photos.length === 0) return <p>사진이 없습니다.</p>;

  console.log(photos);

  return (
    <>
      <h1>홈 페이지 입니다.</h1>
    </>
  );
}
