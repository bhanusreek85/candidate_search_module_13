import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className='nav'>
      <ul className='nav-list'>
        <li className='nav-item nav-link'>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li className='nav-item nav-link'>
          <NavLink to="/SavedCandidates" className={({ isActive }) => (isActive ? 'active' : '')}>
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
