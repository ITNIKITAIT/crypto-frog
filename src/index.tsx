import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";

import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "lib/auth/admin/AuthContext";
import { NotificationProvider } from "lib/notification";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import reportWebVitals from "./reportWebVitals";
import { router } from "./router";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
