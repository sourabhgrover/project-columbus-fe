import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000, // Timeout duration
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to inject token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;
