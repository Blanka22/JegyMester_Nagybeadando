import React, { useState } from "react";
import api from "../services/api";

function RegisterPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        phone: "",
        fullName: ""
    });

    const register = async () => {
        try {
            await api.post("/auth/register", form);

            alert("Sikeres regisztráció!");
            window.location.href = "/login";
        } catch (error) {
            alert("Sikertelen regisztráció!");
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Regisztráció</h1>

            <input
                placeholder="Teljes név"
                value={form.fullName}
                onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                }
            />

            <br />

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <br />

            <input
                placeholder="Telefon"
                value={form.phone}
                onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                }
            />

            <br />

            <input
                type="password"
                placeholder="Jelszó"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <br />

            <button onClick={register}>
                Regisztráció
            </button>
        </div>
    );
}

export default RegisterPage;