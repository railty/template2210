import { Menu as IconMenu, AccountCircle as IconAccountCircle, NoAccounts as IconNoAccounts} from '@mui/icons-material';
import { useEffect } from 'react';
import { useAuth } from "../AuthProvider";

export default function Navbar() {
  const { token, login, logout } = useAuth();

  useEffect(()=>{
    login();
  }, []);
  

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <IconMenu />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>

      <div className="navbar-end">
        {token ? (
          <button className="btn btn-ghost btn-circle tooltip tooltip-bottom tooltip-primary" data-tip={token} type="button" onClick={logout}>
            <IconAccountCircle />
          </button>
        ) : (
          <button className="btn btn-ghost btn-circle" type="button" onClick={login}>
            <IconNoAccounts />
          </button>
        )}
      </div>
    </div>  
  );
}