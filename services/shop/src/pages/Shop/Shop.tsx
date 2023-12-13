import React from 'react';
import {shopRoutes} from "@packages/shared/src/routes/shop";
import { Link } from 'react-router-dom';

const Shop = () => {
    return (
        <div>
            SHOP
        <br/>

            <Link to={shopRoutes.second}>Go to the user</Link>
        </div>
    );
};

export default Shop;