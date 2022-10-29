import { redirect, useNavigate, useParams, Outlet, NavLink, BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AddCircleOutline as IconAdd } from '@mui/icons-material';
import { useAppData } from "./AppDataProvider";
import Spinner from "./components/Spinner";

export default function Users() {
  const { contacts, create, remove } = useAppData();
  const navigate = useNavigate();

  const onCreate = async ()=>{
    const contact = await create();
    navigate(`/users/${contact.id}/edit`);
  }
  
  if (contacts.length==0) return <Spinner />

  return (
    <div className="grid grid-cols-3 bg-gray-200">
      <div className="">
        <button className="btn btn-ghost btn-circle" type="button" onClick={onCreate}>
          <IconAdd />
        </button>
        <ul>
          {contacts.map((user) => (
            <li key={user.id} className="prose">
              <NavLink to={user.id} className={({isActive})=>isActive ? "text-blue-800 bg-red-200" : "text-blue-500"}>
                {user.id}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>

      <div className="col-span-2  bg-gray-300">
        <Outlet />
      </div>
    </div>
  )
};

