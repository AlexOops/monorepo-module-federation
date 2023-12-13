import {App} from "@/components/App";
import React, {Suspense} from "react";
import {Shop} from "@/pages/Shop";
import {createBrowserRouter} from "react-router-dom";
import UserCardComponent from "@packages/shared/src/components/userCard/UserCardComponent";

const routes = [
    {
        path: "/shop",
        element: <App/>,
        children: [
            {
                path: "/shop/main",
                element: <Suspense fallback={'Loading...'}><Shop/></Suspense>
            },
            {
                path: "/shop/second",
                element: <Suspense fallback={'Loading...'}>
                    <UserCardComponent username={'Andrey'}/>
                </Suspense>
            }
        ]
    },
]

export const router = createBrowserRouter(routes); // в рамках этого приложения

export default routes; // наружу