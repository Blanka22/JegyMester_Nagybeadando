import React, { useEffect, useState } from "react";
import api from "../services/api";

function MyTicketsPage() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await api.get("/ticket/mytickets", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTickets(response.data);
        } catch (error) {
            console.log(error);
            alert("Nem sikerült betölteni a jegyeket!");
        }
    };

    const deleteTicket = async (ticketId) => {
        const token = localStorage.getItem("token");

        const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt a jegyet?");

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/ticket/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Jegy sikeresen törölve!");

            loadTickets();
        } catch (error) {
            console.log("Törlési hiba:", error);
            alert(
                error.response?.data ||
                "Nem sikerült törölni a jegyet!"
            );
        }
    };

    return (
        <div>
            <h1>Jegyeim 🎟️</h1>

            {tickets.length === 0 && (
                <p>Még nincs jegyed.</p>
            )}

            {tickets.map(ticket => (
                <div key={ticket.id}>
                    <h3>{ticket.screening?.movie?.title}</h3>
                    <p>
                        Jegy ID: {ticket.id}
                    </p>
                    <p>
                        Kezdés: {ticket.screening?.startTime}
                    </p>

                    <p>
                        Terem: {ticket.screening?.hall}
                    </p>

                    <p>
                        Szék: {ticket.seatNumber}
                    </p>

                    <p>
                        Vásárlás ideje: {ticket.purchaseDate}
                    </p>

                    <button onClick={() => deleteTicket(ticket.id)}>
                        Jegy törlése
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default MyTicketsPage;