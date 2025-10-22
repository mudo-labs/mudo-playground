import { SearchCheck } from 'lucide-react';
import { usePhotos, type Images } from '../libs/api';
import MudoGallery from './MudoGallery';
import { useEffect, useMemo, useState } from 'react';

// 처음에 보여줄 짤 개수 선택
const INITIAL_LOAD_COUNT = 30;
const LOAD_MORE_COUNT = 20;

const shuffleArray = (array: Images[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Search = () => {
  const { photos, loading, error } = usePhotos();
  const [searchTerm, setSearchTerm] = useState('');

  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  const [shuffledPhotos, setShuffledPhotos] = useState<Images[]>([]);

  useEffect(() => {
    if (photos.length > 0 && shuffledPhotos.length === 0) {
      setShuffledPhotos(shuffleArray(photos));
    }
  }, [photos, shuffledPhotos.length]);

  const filteredPhotos = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return shuffledPhotos;

    return shuffledPhotos.filter(
      (photo: Images) =>
        photo.title.toLowerCase().includes(term) ||
        photo.keyword.toLowerCase().includes(term) ||
        photo.tags.some(tag => tag.toLowerCase().includes(term)) ||
        photo.cast.some(name => name.toLowerCase().includes(term)),
    );
  }, [shuffledPhotos, searchTerm]);

  const photosToShow = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const hasMore = visibleCount < filteredPhotos.length;

  const loadMore = () => {
    if (loading || !hasMore) return;
    setVisibleCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };

  useMemo(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
    setIsGalleryVisible(false);
  }, [searchTerm]);

  useEffect(() => {
    if (photosToShow.length > 0 && !isGalleryVisible) {
      const timer = setTimeout(() => {
        setIsGalleryVisible(true);
      }, 100); // 0.1초 딜레이
      return () => clearTimeout(timer);
    }
  }, [photosToShow, isGalleryVisible]);

  if (loading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">오류가 발생했습니다.</div>;

  const count = filteredPhotos.length;

  console.log(photos);
  return (
    <div className="min-h-screen bg-background mt-32">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto pl-16 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">무도 짤 갤러리</h1>
              <p className="text-pretty text-sm text-muted-foreground">{count}개의 짤을 찾았습니다</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <SearchCheck className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="키워드나 대사로 검색..."
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <main className="container mx-auto px-4 py-8">
        {count > 0 ? (
          <MudoGallery photos={photosToShow} loadMore={loadMore} hasMore={hasMore} isVisible={isGalleryVisible} />
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
            <p className="text-lg font-medium">검색 결과가 없습니다</p>
            <p className="text-sm text-muted-foreground">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
