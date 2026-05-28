import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function ScreeningsPage() {
    const [screenings, setScreenings] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        loadScreenings();
    }, []);

    const loadScreenings = async () => {
        try {
            const response = await api.get("/screening");

            const filtered = response.data.filter(
                s => s.movieId == parseInt(movieId)
            );

            setScreenings(filtered);
        } catch (error) {
            console.log(error);
        }
    };

    const buyTicket = async (screeningId) => {
        const token = localStorage.getItem("token");

        try {
            await api.post(
                "/ticket/buy",
                {
                    screeningId: screeningId,
                    seatNumber: Math.floor(Math.random() * 50) + 1,
                    guestEmail: "",
                    guestPhone: ""
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Sikeres jegyvásárlás!");
        } catch (error) {
            console.log("TELJES HIBA:", error);
            console.log("BACKEND VÁLASZ:", error.response);

            alert(
                error.response?.data ||
                error.response?.status ||
                "Nem sikerült a jegyvásárlás!"
            );
        }
    };

    return (
        <div>
            <h1>Vetítések 🎞️</h1>

            {screenings.map(screening => (
                <div key={screening.id}>
                    <p>Kezdés: {screening.startTime}</p>
                    <p>Terem: {screening.hall}</p>
                    <p>Férőhely: {screening.totalSeats}</p>

                    <button onClick={() => buyTicket(screening.id)}>
                        Jegyvásárlás
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default ScreeningsPage;