import { Link, redirect, useNavigate, useParams, Outlet, NavLink, BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAppData } from "./AppDataProvider";
import { Edit as IconEdit, Clear as IconClear } from '@mui/icons-material';
import { useEffect, useState } from "react";

export default function User() {
  const user = useParams();
  const navigate = useNavigate();
  const { contacts, create, remove, getContact } = useAppData();
  const [contact, setContact] = useState();

  const refreshUser = async ()=>{
    const contact = await getContact(user.userId)
    console.log(contact);
    setContact(contact);
  }

  useEffect(()=>{
    refreshUser();
  }, [user]);

  const onRemove = async ()=>{
    await remove(user.userId);
    navigate(`/users`)
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">User: {user.userId}</h2>
        
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              First Name: {contact && contact['first-name']}
            </div>
            <div className="col-span-6 sm:col-span-3">
              Last Name: {contact && contact['last-name']}
            </div>
          </div>
        </div>

        <div className="card-actions justify-end">
          <button type="button" className="btn btn-secondary"  onClick={onRemove}> Remove </button>
          <Link to="editEmbed" className="btn btn-primary">EditEmbed</Link>
          <Link to="edit" className="btn btn-primary">Edit</Link>
        </div>
      </div>
    </div>      
  );
};
