import { Navigate } from 'umi'
import {useAuth} from "react-use-auth";
import React from "react";


const withAuth = (Component) => ()=>{
    let token = sessionStorage.getItem("token");
    if (token) {
        return <Component />;
    } else{
        return <Navigate to="/login" />;
    }
}
export default withAuth;
