import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import { useEffect } from "react";
export default function PrivateOutlet() {
    const navigate = useNavigate();
    return (
      localStorage.getItem("user") ? <Outlet /> : <Navigate to = "/login" />
    )
}