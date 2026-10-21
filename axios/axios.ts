import axios from "axios";

export const Axios = axios.create({
    baseURL: "/api",
    timeout: 10_000,
});
