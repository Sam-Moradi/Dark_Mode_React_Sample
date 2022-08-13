import Home, { Page2 } from "./App";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import config from "./../misc/config";
import React, { useState } from "react";
// Use something like react-router-dom to manage multiple pages/routes
export default function Routing() {
  const [accessPage, setAccessPage] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={<Home setAccessPage={setAccessPage} />}
        ></Route>
        <Route
          path={accessPage ? `/${config.SUCESSS_PAGE_NAME}` : "/"}
          element={<Page2 />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
