import React from 'react';
import s from "./App.module.scss";
import {Link, Outlet} from "react-router-dom";
import {shopRoutes} from "@packages/shared/src/routes/shop";
import {adminRoutes} from "@packages/shared/src/routes/admin";

export const App = () => {
    return (
        <div className={s.block}>
            <h1>MAIN PAGE</h1>
            <Link to={adminRoutes.about}>ADMIN</Link>
            <br/>
            <Link to={shopRoutes.main}>SHOP</Link>
            <Outlet/>
        </div>
    );
};