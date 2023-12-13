import React from 'react';
import s from "./App.module.scss";
import {Outlet} from "react-router-dom";

export const App = () => {
    return (
        <div className={s.block}>
            <h1>ADMIN MODULE</h1>


            <Outlet/>
        </div>
    );
};