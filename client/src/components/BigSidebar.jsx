import BigSidebarWrapper from '../assets/wrappers/BigSidebar';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { useDashboardContext } from '../utils/contextServices';

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <BigSidebarWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </BigSidebarWrapper>
  );
};

export default BigSidebar;
