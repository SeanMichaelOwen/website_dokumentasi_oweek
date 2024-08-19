"use client";

export default function PhotoGallery() {
    // Array of image URLs
    const images = [
        "/foto.jpeg",
        "/foto.jpeg",
        "/foto.jpeg",
        "/foto.jpeg",
    ];

    return (
        <main className="h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-3xl  text-black font-bold mb-6">Gallery</h1>
                <div className="grid grid-cols-2 gap-4 mx-auto max-w-screen-md">
                    {images.map((image, index) => (
                        <div key={index} className="relative overflow-hidden w-64 h-64 rounded-lg">
                            <img
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
