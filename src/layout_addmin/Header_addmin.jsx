import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  { to : '/', text: 'Hom_addmin' },
  { to : '/newproduct_addmin', text: 'Add a place' },
  // { to : '/newproduct_addmin', text: 'Map_addmin' },
  // { to : '/serialhom_addmin', text: 'Member_addmin' },
  { to : '/userhome_addmin', text: 'Region' },
  // { to : '/warhousecard_addmin', text: 'Addmin' },
  // { to : '/header_addmin', text: 'Addmin' },
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-400">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{user?.id ? user.username : ''}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}
