import axios from "axios";

const api = axios.create({
    baseURL:
        "https://literate-sniffle-jj796pww4qgj3qjgx-5000.app.github.dev/api"
});

export default api;