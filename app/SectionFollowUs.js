"use client";

import { FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function FollowUs() {
    const icons = [
        { name: "Instagram", component: FaInstagram, url: "https://www.instagram.com/our_fridtjof27?igsh=bDRjcm5mYmM1Nzdt" },
        { name: "Youtube", component: FaYoutube, url: "https://youtube.com" },
        { name: "Pinterest", component: FaPinterest, url: "https://pinterest.com" },
    ];

    return (
        <main className="h-screen flex flex-col items-center justify-center text-black px-4 py-6 sm:px-8 sm:py-12" id="more">
            <h1 className="text-2xl font-bold text-center mb-4 sm:text-3xl mb-6">Follow Us</h1>
            <div className="mb-6">
                <img
                    src="/logo.png" // Replace with your image path
                    alt="Decorative"
                    className="w-[200px] h-auto mb-4 object-fit sm:w-[280px]"
                />
            </div>
            <div className="mb-6">
                <div className="flex gap-4">
                    <ul className="flex gap-4">
                        {icons.map((icon, index) => {
                            const IconComponent = icon.component;
                            return (
                                <li key={index}>
                                    <a
                                        href={icon.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-2xl hover:text-gray-700 sm:text-3xl"
                                    >
                                        <IconComponent />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="text-center max-w-2xl px-4 sm:px-6">
                <p className="text-sm sm:text-base">
                    FRIDTJOF 27
                    <br />
                    The esgata gate is watered by a freestyle smile. But the latest but most interesting thing is my lack of interest in the valley and the timing of the shooting.
                    <br />
                    <br />
                    In every moment of stillness, we find a new perspective. It is in the quiet corners of our minds that creativity blossoms and dreams take flight. Embrace the journey with curiosity and let the rhythm of your heart guide you to endless possibilities.
                </p>
            </div>
        </main>
    );
}
