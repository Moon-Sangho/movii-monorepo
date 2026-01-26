import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="bg-(--color-background-elevated) border-b border-gray-800">
      <div className="flex items-center justify-between px-8 py-4">
        <Link to="/dashboard" className="text-2xl font-bold text-(--color-primary10)">
          Movii Insights
        </Link>
        <nav className="flex gap-6">
          <Link to="/dashboard" className="hover:text-(--color-primary10)">
            Dashboard
          </Link>
          <Link to="/movies" className="hover:text-(--color-primary10)">
            Movies
          </Link>
          <Link to="/analytics" className="hover:text-(--color-primary10)">
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
