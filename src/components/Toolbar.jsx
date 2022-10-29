import { NavLink, useLocation } from "react-router-dom";

export default function Toolbar() {
  let { pathname} = useLocation();
  pathname = "/" + pathname.match(/\/([^\/]*)/)[1];

  const tabs = [
    {
      pathname: '/home',
      label: 'Home'
    },
    {
      pathname: '/users',
      label: 'Users'
    },
    {
      pathname: '/admin',
      label: 'Admin'
    },
    {
      pathname: '/dashboard',
      label: 'Dashboard'
    }
  ];

  return (
    <div className="tabs">
      {tabs.map((t, i)=>{
        const style = t.pathname == pathname ? "tab-active" : "";
        return (
          <NavLink key={i} to={t.pathname} className={`tab tab-lg tab-lifted font-bold ${style}`}>{t.label}</NavLink>
        )
      })}
    </div>
  );
}