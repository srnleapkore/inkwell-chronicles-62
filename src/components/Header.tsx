
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-900">
            MyBlog
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search size={20} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
