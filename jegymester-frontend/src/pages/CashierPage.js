import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CashierPage() {
    const [ticketId, setTicketId] = useState("");

    const validateTicket = async () => {
        const token = localStorage.getItem("token");

        try {
            await api.post(`/ticket/validate/${ticketId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Jegy sikeresen érvényesítve!");
            setTicketId("");
        } catch (error) {
            alert(error.response?.data || "Nem sikerült érvényesíteni!");
        }
    };

    return (
        <div>
            <h1>Pénztáros panel 💼</h1>

            <h2>Jegy érvényesítés</h2>

            <input
                type="number"
                placeholder="Jegy ID"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
            />

            <br />

            <button onClick={validateTicket}>
                Jegy érvényesítése
            </button>

            <hr />

            <h2>Helyszíni vásárlás</h2>

            <Link to="/guest-buy">
                Vendég / helyszíni jegyvásárlás
            </Link>
        </div>
    );
}

export default CashierPage;