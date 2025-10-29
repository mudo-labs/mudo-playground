import { SearchCheck, Tag } from 'lucide-react';
import { usePhotos, usePopularTags, type Images } from '../libs/api';
import MudoGallery from './MudoGallery';
import { useEffect, useMemo, useState } from 'react';
import usePageTitle from '../hooks/usePageTItle';

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
  usePageTitle('무도 짤 갤러리');
  const { photos, loading, error } = usePhotos();
  const { tags, loading: tagsLoading, error: tagsError } = usePopularTags(40);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(false);

  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [shuffledPhotos, setShuffledPhotos] = useState<Images[]>([]);

  // 처음 로드 시 사진 랜덤 섞기
  useEffect(() => {
    if (photos.length > 0 && shuffledPhotos.length === 0) {
      setShuffledPhotos(shuffleArray(photos));
    }
  }, [photos, shuffledPhotos]);

  // 검색 및 태그 필터링
  const filteredPhotos = useMemo(() => {
    let basePhotos = shuffledPhotos;

    if (selectedTag) {
      basePhotos = basePhotos.filter(photo => photo.tags.includes(selectedTag));
    }

    const term = searchTerm.toLowerCase().trim();
    if (!term) return basePhotos;

    return basePhotos.filter(
      (photo: Images) =>
        photo.title.toLowerCase().includes(term) ||
        photo.keyword.toLowerCase().includes(term) ||
        photo.tags.some(tag => tag.toLowerCase().includes(term)) ||
        photo.cast.some(name => name.toLowerCase().includes(term)),
    );
  }, [shuffledPhotos, searchTerm, selectedTag]);

  // 보여줄 갤러리 수 계산
  const photosToShow = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const hasMore = visibleCount < filteredPhotos.length;

  // 더보기 로드
  const loadMore = () => {
    if (loading || !hasMore) return;
    setVisibleCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };

  // 검색어나 태그 변경 시 초기화
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
    setIsGalleryVisible(false);
  }, [searchTerm, selectedTag]);

  // 갤러리 표시 지연 (애니메이션용)
  useEffect(() => {
    if (photosToShow.length > 0 && !isGalleryVisible) {
      const timer = setTimeout(() => setIsGalleryVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [photosToShow, isGalleryVisible]);

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    // setSearchTerm(''); // 태그 클릭 시 검색어 초기화하고 싶다면 주석 해제
  };

  if (loading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">오류가 발생했습니다.</div>;

  const count = filteredPhotos.length;

  return (
    <div className="min-h-screen bg-background mt-10">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">무도 짤 갤러리</h1>
              <p className="text-pretty text-sm text-muted-foreground">
                {selectedTag
                  ? `#${selectedTag} 태그에서 ${count}개의 짤을 찾았습니다`
                  : `총 ${count}개의 짤을 찾았습니다`}
              </p>
            </div>

            {/* 검색창 */}
            <div className="relative">
              <SearchCheck className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="키워드나 대사로 검색..."
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-black placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 태그 보기 버튼 */}
            <button
              onClick={() => setShowTags(!showTags)}
              className="flex items-center gap-1.5 rounded-md border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Tag className="size-4" />
              {showTags ? '태그 닫기' : '인기 태그로 보기'}
            </button>
          </div>

          {/* 태그 목록 */}
          {showTags && (
            <div className="mt-4 max-w-3xl mx-auto">
              {tagsLoading ? (
                <div className="text-center text-sm text-muted-foreground">인기 태그 로딩 중...</div>
              ) : tagsError ? (
                <div className="text-center text-sm text-red-500">태그 불러오기 실패</div>
              ) : tags && tags.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* 전체 보기 */}
                  <button
                    onClick={() => handleTagClick(null)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors
                      ${
                        !selectedTag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                  >
                    # 전체 보기
                  </button>

                  {/* 인기 태그 목록 */}
                  {tags.map(tag => (
                    <button
                      key={tag.name}
                      onClick={() => handleTagClick(tag.name)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors
                        ${
                          selectedTag === tag.name
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-accent'
                        }`}
                    >
                      # {tag.name}
                      <span className="ml-1 opacity-70">({tag.count})</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground">표시할 태그가 없습니다</div>
              )}
            </div>
          )}
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
