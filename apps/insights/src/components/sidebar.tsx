import { NavLink } from 'react-router';

import { cn } from '@/utils/cn';

const menuItems = [
  { path: '/dashboard', label: 'Overview', icon: '📊' },
  { path: '/movies', label: 'Movies', icon: '🎬' },
  { path: '/analytics', label: 'Analytics', icon: '📈' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-[calc(100vh-73px)] border-r border-gray-800 bg-(--color-background-elevated)">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                    isActive ? 'bg-(--color-primary10) text-white' : 'hover:bg-gray-800',
                  )
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
