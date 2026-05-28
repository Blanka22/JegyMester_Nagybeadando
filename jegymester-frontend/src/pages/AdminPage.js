import React, { useEffect, useState } from "react";
import api from "../services/api";

function AdminPage() {
    const [movies, setMovies] = useState([]);
    const [screenings, setScreenings] = useState([]);

    const [movieForm, setMovieForm] = useState({
        title: "",
        description: "",
        duration: "",
        ageRating: ""
    });

    const [screeningForm, setScreeningForm] = useState({
        movieId: "",
        startTime: "",
        hall: "",
        totalSeats: ""
    });

    useEffect(() => {
        loadMovies();
        loadScreenings();
    }, []);

    const getAuthHeader = () => {
        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const loadMovies = async () => {
        try {
            const response = await api.get("/movie");
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadScreenings = async () => {
        try {
            const response = await api.get("/screening");
            setScreenings(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addMovie = async () => {
        try {
            await api.post(
                "/movie",
                {
                    title: movieForm.title,
                    description: movieForm.description,
                    duration: parseInt(movieForm.duration),
                    ageRating: movieForm.ageRating
                },
                getAuthHeader()
            );

            alert("Film hozzáadva!");

            setMovieForm({
                title: "",
                description: "",
                duration: "",
                ageRating: ""
            });

            loadMovies();
        } catch (error) {
            console.log("FILM HIBA:", error);
            alert(
                error.response?.data ||
                error.response?.status ||
                "Nem sikerült hozzáadni a filmet!"
            );
        }
    };

    const deleteMovie = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a filmet?")) return;

        try {
            await api.delete(`/movie/${id}`, getAuthHeader());
            alert("Film törölve!");
            loadMovies();
        } catch (error) {
            console.log(error);
            alert(error.response?.data || "Nem sikerült törölni a filmet!");
        }
    };

    const addScreening = async () => {
        try {
            await api.post(
                "/screening",
                {
                    movieId: parseInt(screeningForm.movieId),
                    startTime: screeningForm.startTime,
                    hall: screeningForm.hall,
                    totalSeats: parseInt(screeningForm.totalSeats),
                    room: screeningForm.hall,
                    availableSeats: parseInt(screeningForm.totalSeats)
                },
                getAuthHeader()
            );

            alert("Vetítés hozzáadva!");

            setScreeningForm({
                movieId: "",
                startTime: "",
                hall: "",
                totalSeats: ""
            });

            loadScreenings();
        } catch (error) {
            console.log(error);
            alert(error.response?.data || "Nem sikerült hozzáadni a vetítést!");
        }
    };

    const deleteScreening = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a vetítést?")) return;

        try {
            await api.delete(`/screening/${id}`, getAuthHeader());
            alert("Vetítés törölve!");
            loadScreenings();
        } catch (error) {
            console.log(error);
            alert(error.response?.data || "Nem sikerült törölni a vetítést!");
        }
    };

    return (
        <div>
            <h1>Admin panel 👑</h1>

            <hr />

            <h2>Film hozzáadása</h2>

            <input
                placeholder="Film címe"
                value={movieForm.title}
                onChange={(e) =>
                    setMovieForm({ ...movieForm, title: e.target.value })
                }
            />

            <br />

            <input
                placeholder="Leírás"
                value={movieForm.description}
                onChange={(e) =>
                    setMovieForm({ ...movieForm, description: e.target.value })
                }
            />

            <br />

            <input
                type="number"
                placeholder="Hossz percben"
                value={movieForm.duration}
                onChange={(e) =>
                    setMovieForm({ ...movieForm, duration: e.target.value })
                }
            />

            <br />

            <input
                placeholder="Korhatár"
                value={movieForm.ageRating}
                onChange={(e) =>
                    setMovieForm({ ...movieForm, ageRating: e.target.value })
                }
            />

            <br />

            <button onClick={addMovie}>Film hozzáadása</button>

            <hr />

            <h2>Filmek</h2>

            {movies.map(movie => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <p>Hossz: {movie.duration} perc</p>
                    <p>Korhatár: {movie.ageRating}</p>

                    <button onClick={() => deleteMovie(movie.id)}>
                        Film törlése
                    </button>

                    <hr />
                </div>
            ))}

            <h2>Vetítés hozzáadása</h2>

            <select
                value={screeningForm.movieId}
                onChange={(e) =>
                    setScreeningForm({
                        ...screeningForm,
                        movieId: e.target.value
                    })
                }
            >
                <option value="">Válassz filmet</option>

                {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>
                        {movie.title}
                    </option>
                ))}
            </select>

            <br />

            <input
                type="datetime-local"
                value={screeningForm.startTime}
                onChange={(e) =>
                    setScreeningForm({
                        ...screeningForm,
                        startTime: e.target.value
                    })
                }
            />

            <br />

            <input
                placeholder="Terem"
                value={screeningForm.hall}
                onChange={(e) =>
                    setScreeningForm({
                        ...screeningForm,
                        hall: e.target.value
                    })
                }
            />

            <br />

            <input
                type="number"
                placeholder="Férőhelyek száma"
                value={screeningForm.totalSeats}
                onChange={(e) =>
                    setScreeningForm({
                        ...screeningForm,
                        totalSeats: e.target.value
                    })
                }
            />

            <br />

            <button onClick={addScreening}>Vetítés hozzáadása</button>

            <hr />

            <h2>Vetítések</h2>

            {screenings.map(screening => (
                <div key={screening.id}>
                    <p>Film ID: {screening.movieId}</p>
                    <p>Kezdés: {screening.startTime}</p>
                    <p>Terem: {screening.hall}</p>
                    <p>Férőhely: {screening.totalSeats}</p>

                    <button onClick={() => deleteScreening(screening.id)}>
                        Vetítés törlése
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default AdminPage;