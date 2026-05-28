import React, { useState } from "react";
import api from "../services/api";

function ProfilePage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "Test123!"
    });

    const updateProfile = async () => {
        const token = localStorage.getItem("token");

        try {
            await api.put("/user/profile", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Profil sikeresen módosítva!");
        } catch (error) {
            console.log(error);
            alert(error.response?.data || "Nem sikerült módosítani a profilt!");
        }
    };

    return (
        <div>
            <h1>Profil módosítása 👤</h1>

            <input
                placeholder="Teljes név"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />

            <br />

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <br />

            <input
                placeholder="Telefon"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <br />

            <button onClick={updateProfile}>
                Profil mentése
            </button>
        </div>
    );
}

export default ProfilePage;