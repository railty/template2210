import { useState } from "react";
import { redirect, useNavigate, useParams, Outlet, NavLink, BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Navbar from "./components/Navbar";
import Toolbar from "./components/Toolbar";
import Users from "./Users";
import User from "./User";
import UserEdit from "./UserEdit";
import { useAppData } from "./AppDataProvider";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};


const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

const Home = () => {
  return (
    <>
      <h2>Home (Public)</h2>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard (Private)</h2>
    </>
  );
};

const Admin = () => {
  //const { contacts, create, remove } = useAppData();

  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(100);
  
  const test1 = ()=>{
    setV1(v1+1);
  }

  const test2 = ()=>{
    setTimeout(()=>{
      setV2(v2+1);
    }, 3000);
  }

  return (
    <>
      <h2>Admin (Protected)</h2>
      <h3>v1 = {v1}</h3>
      <button className="btn btn-primary" onClick={test1}>test 1</button>
      <h3>v2 = {v2}</h3>
      <button className="btn btn-primary" onClick={test2}>test 2</button>
    </>
  );
};

const UserEditEmbed = () => {
  return (
    <>
      <h2>User Edit Embed</h2>
    </>
  );
};

const NoMatch = () => {
  return (
    <>
      <h2>No Match</h2>
    </>
  );
};

export default function AppRouter(){
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-blue-200 ">
      <Navbar />
      <Toolbar />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="home" element={<Home/>} />

          <Route path="users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }>
            <Route path=":userId" element={<User />} >
              <Route path="editEmbed" element={<UserEditEmbed />} />
            </Route>
            <Route path=":userId/edit" element={<UserEdit />} />
          </Route>

          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
          } />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

    </div>
  );
}
