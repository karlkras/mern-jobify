import navLinks from '../utils/links';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../utils/contextServices';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const { role } = user;
  return (
    <div className="nav-links">
      {navLinks.map((link, index) => {
        const { text, path, icon } = link;
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            key={index}
            to={path}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
