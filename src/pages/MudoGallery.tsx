import { Download, X } from 'lucide-react';
import type { Images } from '../libs/api';
import { useCallback, useRef, useState } from 'react';

const GalleryImageLoader = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* 스켈레톤 플레이스홀더 */}
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 실제 이미지 */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const animationStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1.0) translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
.animate-scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}
`;

interface MudoGalleryProps {
  photos: Images[];
  loadMore: () => void;
  hasMore: boolean;
  isVisible: boolean;
}

const MudoGallery = ({ photos, loadMore, hasMore, isVisible }: MudoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Images | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore, hasMore],
  );

  const handleOpenModal = (photo: Images) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const rawImageUrl = imageUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
      const response = await fetch(rawImageUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = title.includes('.') ? title : `${title || 'jjal'}.jpg`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  return (
    <>
      <style>{animationStyles}</style>

      {/* 갤러리 본문 */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {photos.map((photo, index) => {
          const isLastElement = index === photos.length - 1;
          return (
            <div
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl aspect-square"
              onClick={() => handleOpenModal(photo)}
              ref={isLastElement ? lastElementRef : null}
            >
              <GalleryImageLoader src={photo.imgPath} alt={photo.title} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-center font-semibold text-white">{photo.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white  p-6 shadow-2xl animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                handleDownload(selectedPhoto.imgPath, selectedPhoto.title);
              }}
              className="absolute top-3 right-14 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
              aria-label="Download image"
            >
              <Download className="size-5" />
            </button>

            {/* 짤 이미지 */}
            <div className="overflow-hidden rounded-lg">
              <img src={selectedPhoto.imgPath} alt={selectedPhoto.title} className="h-auto w-full" />
            </div>

            {/* 짤 정보 */}
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{selectedPhoto.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedPhoto.episodeName} (EP.{selectedPhoto.episodeNum}) - {selectedPhoto.episodeDate}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-sm">키워드:</span>
                {selectedPhoto.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-sm">출연진:</span>
                {selectedPhoto.cast.map((name, index) => (
                  <span
                    key={`${name}-${index}`}
                    className="rounded-full bg-gray-300 px-3 py-1 text-xs font-normal text-black "
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MudoGallery;
