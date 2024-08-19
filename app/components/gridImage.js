import { useState, useRef, useEffect } from 'react';

const GridImage = () => {
  const gridItems = [
    { id: 1, images: ['/image/FotoTest.jpg'], link: 'https://www.instagram.com/sean_michaelowen?igsh=MnA4ZG42cGo5dDkz' },
    { id: 2, images: ['/foto2.jpeg'], link: 'https://example.com/foto2' },
    { id: 3, images: ['/foto3.jpeg'], link: 'https://example.com/foto3' },
    { id: 4, images: ['/foto4.jpeg'], link: 'https://example.com/foto4' },
    { id: 5, images: ['/foto.jpeg'], link: 'https://example.com/foto5' },
    { id: 6, images: ['/foto4.jpeg'], link: 'https://example.com/foto6' },
  ];

  const [currentGridIndex, setCurrentGridIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [popupImage, setPopupImage] = useState(null);
  const [popupLink, setPopupLink] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const scrollRef = useRef(null);

  const updateItemsPerView = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerView(1);
    } else if (width < 1024) {
      setItemsPerView(2);
    } else {
      setItemsPerView(3);
    }
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const groupedItems = gridItems.reduce((acc, item, index) => {
    if (index % itemsPerView === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  const nextGrid = () => {
    setCurrentGridIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % groupedItems.length;
      scrollToIndex(nextIndex);
      return nextIndex;
    });
  };

  const prevGrid = () => {
    setCurrentGridIndex((prevIndex) => {
      const prevIndexCalc = prevIndex === 0 ? groupedItems.length - 1 : prevIndex - 1;
      scrollToIndex(prevIndexCalc);
      return prevIndexCalc;
    });
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center" id="MemberPhoto">
      <div className="relative overflow-hidden max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-black">Member Photo</h1>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex transition-transform duration-700 ease-in-out"
          >
            {groupedItems.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-shrink-0 w-full">
                {group.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 ${itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-1/2' : 'w-1/3'} flex items-center justify-center`}
                    onClick={() => {
                      setPopupImage(item.images[0]);
                      setPopupLink(item.link);
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg w-full h-0 pb-[100%] bg-gray-200">
                      <img
                        src={item.images[0]}
                        alt={`Image ${item.id}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg border border-[#EF4413]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={prevGrid}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full focus:outline-none shadow-md transition-colors hover:bg-gray-700"
            style={{ zIndex: 10 }}
          >
            &lt;
          </button>
          <button
            onClick={nextGrid}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full focus:outline-none shadow-md transition-colors hover:bg-gray-700"
            style={{ zIndex: 10 }}
          >
            &gt;
          </button>
        </div>
        <p className="mt-4 p-4 text-center text-black text-sm sm:text-base">
          This is a long paragraph that can be used to describe the content of the images
          displayed in the grid above. You can include details about each image, the purpose
          of the gallery, or any additional information that might be relevant to the viewer.
          Feel free to adjust the text to match the specific context and purpose of your
          image grid. This text is styled to be centered below the slider for a clean and
          readable presentation.
        </p>

        {/* Popup for individual image */}
        {popupImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-sm mx-4">
              <img
                src={popupImage}
                alt="Popup"
                className="w-full h-64 object-cover border border-[#EF4413] rounded-lg"
              />
              <a
                href={popupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none inline-block"
              >
                Follow
              </a>
              <button
                onClick={() => setPopupImage(null)}
                className="absolute bottom-2 right-2 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Popup for gallery */}
        {showGallery && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-4">
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-2 right-2 text-black text-lg font-bold"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {gridItems.map((item) => (
                  <div key={item.id} className="relative overflow-hidden rounded-lg w-32 h-32 bg-gray-200">
                    <img
                      src={item.images[0]}
                      alt={`Gallery Image ${item.id}`}
                      className="w-full h-full object-cover border border-[#EF4413] rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default GridImage;
