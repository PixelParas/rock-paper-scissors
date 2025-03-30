import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex gap-5 items-center justify-between p-4 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src="https://cdn-icons-png.flaticon.com/512/6831/6831874.png" alt="Logo" className="h-10 w-10" />
        <div className="flex flex-col gap-0">
        <span className="text-m font-bold">rock-paper</span>
        <span className="text-m font-bold">scissors</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
        />
      </div>

      {/* Right: Navigation Links */}
      <nav className="flex items-center gap-4">
        <Link to="/quizzes">
          <Button variant="ghost">Custom Quizzes</Button>
        </Link>
        <Link to="/textbook">
          <Button variant="ghost">Textbook Solutions</Button>
        </Link>
        <Link to="/ai-help">
          <Button variant="ghost">AI Help</Button>
        </Link>
        <Link to="/login">
          <Button variant="default">Login</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
