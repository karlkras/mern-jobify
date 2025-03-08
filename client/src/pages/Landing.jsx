import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import LandingWrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  return (
    <LandingWrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            dolorem officiis eius repudiandae! Sapiente commodi dolore, at,
            libero placeat voluptatum temporibus inventore laudantium nostrum
            quas numquam, sunt modi est nulla?
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </LandingWrapper>
  );
};
export default Landing;
