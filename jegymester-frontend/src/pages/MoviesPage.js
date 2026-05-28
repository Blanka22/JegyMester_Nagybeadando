import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";


function MoviesPage() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        loadMovies();

    }, []);

    const loadMovies = async () => {

        try {

            const response =
                await api.get("/movie");

            setMovies(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div>

            <h1>Filmek 🎬</h1>

            {movies.map(movie => (

                <div key={movie.id}>

                    <h2>{movie.title}</h2>

                    <p>{movie.description}</p>

                    <p>
                        Játékidő:
                        {movie.durationMinutes} perc
                    </p>

                    <Link to={`/screenings/${movie.id}`}>
                        Vetítések
                    </Link>

                    <hr />

                </div>
            ))}

        </div>
    );
}

export default MoviesPage;