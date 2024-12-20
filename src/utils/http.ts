import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_VITE_BACKEND_LOCAL_SERVER_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
})

export default instance;