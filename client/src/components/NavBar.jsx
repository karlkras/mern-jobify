import NavBarWrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../utils/contextServices';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <NavBarWrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </NavBarWrapper>
  );
};

export default NavBar;
