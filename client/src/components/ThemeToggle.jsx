import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import ThemeToggleWrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../utils/contextServices';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <ThemeToggleWrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </ThemeToggleWrapper>
  );
};

export default ThemeToggle;
