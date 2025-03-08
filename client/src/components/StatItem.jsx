import StatItemWrapper from '../assets/wrappers/StatItem';

const StatItem = ({ count, title, icon, color, $bgc }) => {
  const wrapperProps = { color, $bgc };
  return (
    <StatItemWrapper {...wrapperProps}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </StatItemWrapper>
  );
};

export default StatItem;
