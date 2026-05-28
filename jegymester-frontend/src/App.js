import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import MoviesPage from "./pages/MoviesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ScreeningsPage from "./pages/ScreeningsPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import CashierPage from "./pages/CashierPage";
import GuestBuyPage from "./pages/GuestBuyPage";

function HomePage() {
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        alert("Kijelentkeztél!");
        window.location.href = "/";
    };

    const getRole = () => {
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            return payload[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
        } catch {
            return null;
        }
    };

    const role = getRole();

    return (
        <div>
            <h1>🎬 JegyMester</h1>

            {token ? (
                <p>✅ Be vagy jelentkezve ({role})</p>
            ) : (
                <p>❌ Nem vagy bejelentkezve</p>
            )}

            <h3>Menü</h3>

            <ul>
                <li><Link to="/movies">Filmek</Link></li>

                {!token && <li><Link to="/login">Bejelentkezés</Link></li>}
                {!token && <li><Link to="/register">Regisztráció</Link></li>}
                {!token && <li><Link to="/guest-buy">Vendég jegyvásárlás</Link></li>}

                {token && <li><Link to="/mytickets">Jegyeim</Link></li>}
                {token && <li><Link to="/profile">Profil</Link></li>}

                {role === "Admin" && <li><Link to="/admin">Admin panel</Link></li>}
                {role === "Cashier" && <li><Link to="/cashier">Pénztáros panel</Link></li>}

                {token && (
                    <li>
                        <button onClick={logout}>Kijelentkezés</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/movies" element={<MoviesPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/screenings/:movieId"
                    element={<ScreeningsPage />}
                />

                <Route
                    path="/mytickets"
                    element={<MyTicketsPage />}
                />

                <Route
                    path="/admin"
                    element={<AdminPage />}
                />

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="/cashier"
                    element={<CashierPage />}
                />
                <Route
                    path="/guest-buy"
                    element={<GuestBuyPage />}
                />

            </Routes>
        </Router>
    );
}

export default App;