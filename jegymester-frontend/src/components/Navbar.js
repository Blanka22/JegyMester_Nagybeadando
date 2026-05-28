import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");

    return (
        <div>

            <Link to="/">Filmek</Link>

            <br />

            {!token && <Link to="/login">Login</Link>}

            <br />

            {!token && <Link to="/register">Register</Link>}

            <br />

            {token && <Link to="/mytickets">Jegyeim</Link>}
            <br />
            {token && <Link to="/admin">Admin panel</Link>}
            <br />

            {!token && <Link to="/profile">Profil</Link>}
            <br />

            {!token && <Link to="/cashier">Pénztáros panel</Link>}

        </div>
    );
}

export default Navbar;