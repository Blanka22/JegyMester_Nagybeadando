import axios from "axios";
import AdminPage from "./pages/AdminPage";

const api = axios.create({
    baseURL: "https://localhost:44306/swagger/index.html"
});

export default api;