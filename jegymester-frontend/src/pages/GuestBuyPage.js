import React, { useState } from "react";
import api from "../services/api";

function GuestBuyPage() {
    const [form, setForm] = useState({
        screeningId: "",
        seatNumber: "",
        guestEmail: "",
        guestPhone: ""
    });

    const buyTicket = async () => {
        try {
            await api.post("/ticket/buy", {
                screeningId: parseInt(form.screeningId),
                seatNumber: parseInt(form.seatNumber),
                guestEmail: form.guestEmail,
                guestPhone: form.guestPhone
            });

            alert("Vendég jegyvásárlás sikeres!");
        } catch (error) {
            alert(error.response?.data || "Nem sikerült a vásárlás!");
        }
    };

    return (
        <div>
            <h1>Vendég jegyvásárlás 🎟️</h1>

            <input placeholder="Vetítés ID" onChange={(e) => setForm({ ...form, screeningId: e.target.value })} />
            <br />

            <input placeholder="Szék száma" onChange={(e) => setForm({ ...form, seatNumber: e.target.value })} />
            <br />

            <input placeholder="Email" onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} />
            <br />

            <input placeholder="Telefon" onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} />
            <br />

            <button onClick={buyTicket}>Jegy vásárlása</button>
        </div>
    );
}

export default GuestBuyPage;