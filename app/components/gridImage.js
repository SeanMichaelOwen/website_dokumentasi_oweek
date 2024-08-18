import { useState, useRef, useEffect } from 'react';

const GridImage = () => {
  // Data grid dan gambar
  const gridItems = [
    { id: 1, images: ['/foto.jpeg'] },
    { id: 2, images: ['/foto2.jpeg'] },
    { id: 3, images: ['/foto3.jpeg'] },
    { id: 4, images: ['/foto4.jpeg'] },
    { id: 5, images: ['/foto.jpeg'] },
    { id: 6, images: ['/foto4.jpeg'] },
  ];

  // State untuk menyimpan indeks grid saat ini dan jumlah item per view
  const [currentGridIndex, setCurrentGridIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const scrollRef = useRef(null);

  // Update itemsPerView berdasarkan lebar jendela
  const updateItemsPerView = () => {
    const width = window.innerWidth;
    if (width < 640) { // Mobile
      setItemsPerView(2);
    } else { // Desktop
      setItemsPerView(3);
    }
  };

  useEffect(() => {
    // Initial setting
    updateItemsPerView();

    // Update on resize
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Mengelompokkan gridItems dalam potongan berdasarkan itemsPerView
  const groupedItems = gridItems.reduce((acc, item, index) => {
    if (index % itemsPerView === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  // Fungsi untuk menggeser grid
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

  // Fungsi untuk scroll ke index yang ditentukan
  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  return (
    <div className="relative overflow-hidden max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">Member Photo</h1>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {groupedItems.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-shrink-0 w-full">
              {group.map((item) => (
                <div key={item.id} className={`p-2 ${itemsPerView === 2 ? 'w-1/2' : 'w-1/3'}`}>
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-yellow-500 to-blue-500 opacity-70 rounded-lg"></div>
                    <div className="relative w-full h-64 bg-gray-200 rounded-lg">
                      <img
                        src={item.images[0]}
                        alt={`Image ${item.id}`}
                        className="w-full h-full object-cover rounded-lg border border-[#EF4413]"/>
                    </div>
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
      <p className="mt-4 p-4 text-center text-black">
        This is a long paragraph that can be used to describe the content of the images
        displayed in the grid above. You can include details about each image, the purpose
        of the gallery, or any additional information that might be relevant to the viewer.
        Feel free to adjust the text to match the specific context and purpose of your
        image grid. This text is styled to be centered below the slider for a clean and
        readable presentation.
      </p>
    </div>
  );
};

export default GridImage;
