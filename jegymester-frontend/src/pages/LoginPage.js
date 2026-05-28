import React, { useState } from "react";
import api from "../services/api";

function LoginPage() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const login = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                form
            );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Sikeres bejelentkezés!");

            window.location.href = "/";

        } catch (error) {

            console.log("LOGIN HIBA:", error);

            alert(
                JSON.stringify(error.response?.data) ||
                "Hiba a bejelentkezésnél"
            );
        }
    };

    return (
        <div>

            <h1>Bejelentkezés 🔐</h1>

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({
                        ...form,
                        email: e.target.value
                    })
                }
            />

            <br />

            <input
                type="password"
                placeholder="Jelszó"
                value={form.password}
                onChange={(e) =>
                    setForm({
                        ...form,
                        password: e.target.value
                    })
                }
            />

            <br />

            <button onClick={login}>
                Bejelentkezés
            </button>

        </div>
    );
}

export default LoginPage;