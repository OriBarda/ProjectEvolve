import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { ExecProvider } from "./context/execContext.jsx";
import { WorkoutProvider } from "./context/WorkoutContext.jsx";
import { EventProvider } from "./context/eventContext.jsx";
import { ClassProvider } from "./context/classContext.jsx";
import { LocalProvider } from "./context/LocalContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LocalProvider>
      <UserProvider>
        <ExecProvider>
          <WorkoutProvider>
            <ClassProvider>
              <EventProvider>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </EventProvider>
            </ClassProvider>
          </WorkoutProvider>
        </ExecProvider>
      </UserProvider>
    </LocalProvider>
  </BrowserRouter>
);
