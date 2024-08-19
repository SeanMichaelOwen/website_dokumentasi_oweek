"use client";
import { FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';


export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-sm mb-2">© 2024 Your Company Name. All rights reserved.</p>
                <div className="flex justify-center gap-4 mb-2">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                        <span className="sr-only">Instagram</span>
                        <FaInstagram className="text-2xl" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                        <span className="sr-only">YouTube</span>
                        <FaYoutube className="text-2xl" />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                        <span className="sr-only">Pinterest</span>
                        <FaPinterest className="text-2xl" />
                    </a>
                </div>
                <p className="text-xs">1234 Street Name, City, State, 12345</p>
            </div>
        </footer>
    );
}
