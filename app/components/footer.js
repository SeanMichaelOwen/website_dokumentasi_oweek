// components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 INSJOURNAL. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-white hover:underline">Term of Use</a> | 
            <a href="#" className="ml-2 text-white hover:underline">UI/UX Design</a> | 
            <a href="#" className="ml-2 text-white hover:underline">Privacy Statement</a>
          </div>
        </div>
      </footer>
    )
  }