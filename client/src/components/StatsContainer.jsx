import StatsContainerWrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      $bgc: '#fef3c7'
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      $bgc: '#e0e8f9'
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      $bgc: '#ffeeee'
    }
  ];
  return (
    <StatsContainerWrapper>
      {stats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </StatsContainerWrapper>
  );
};

export default StatsContainer;
