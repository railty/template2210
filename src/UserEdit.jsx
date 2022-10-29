import { Link, redirect, useNavigate, useParams, Outlet, NavLink, BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAppData } from "./AppDataProvider";

export default function UserEdit() {
  const user = useParams();
  const navigate = useNavigate();

  const { contacts, create, remove, update } = useAppData();
  
  const onUpdate = async (e)=>{
    e.preventDefault();  

    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData);
    console.log(user.userId, updates);
    
    await update(user.userId, updates);
    
    navigate(`/users/${user.userId}`);

    return false;
  }

  return (
    <form action="#" method="POST" onSubmit={onUpdate}>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Edit User: {user.userId}</h2>
          
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="label">
                  <span className="label-text font-bold">First name</span>
                </label>
                <input type="text" required name="first-name" id="first-name" placeholder="first name" className="input input-sm input-bordered w-full max-w-xs" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="label">
                  <span className="label-text font-bold">Last name</span>
                </label>
                <input type="text" required name="last-name" id="first-name" placeholder="last name" className="input input-sm input-bordered w-full max-w-xs" />
              </div>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary btn-sm m-4">Save</button>
            <button type="button" className="btn btn-primary btn-sm m-4" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </div>
      </div>      
    </form>
  );
};

