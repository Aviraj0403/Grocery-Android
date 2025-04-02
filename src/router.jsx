 import React, {Suspense} from "react";
 import {
    Route,
    CreateBrowserRouter,
    RouterProvider,
    createRoutesFromChildren,
 } from "react-router-dom";
    import { AuthProvider } from "./context/userContext.jsx";

    const router = CreateBrowserRouter(createRoutesFromChildren([
       <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
       </Route>,
    ]));

    export default router;