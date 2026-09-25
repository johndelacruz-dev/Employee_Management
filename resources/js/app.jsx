import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import GuestRoute from "./components/GuestRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/login" element={<Login />}/>
                <Route element={<AuthenticatedLayout />}>
                    <Route path="/landing" element={<Landing />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('app')).render(
    <App />
);

export default App;