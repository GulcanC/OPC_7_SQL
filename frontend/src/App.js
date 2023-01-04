import React from "react";

// import router
// BrowserRouter is a router implementation that uses the HTML5 history API(pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
// It is the parent component that is used to store all of the other components.
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { ContextProvider } from "./reactContext/ReactContext";

import { AxiosInterceptor } from "./api/Axios";

import Auth from "./pages/Auth";

function App() {
  return (
    <React.Fragment>
      <React.StrictMode>
        <ContextProvider>
          <AxiosInterceptor />
          <Router>
            <Routes>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Router>
        </ContextProvider>
      </React.StrictMode>
    </React.Fragment>
  );
}

export default App;
