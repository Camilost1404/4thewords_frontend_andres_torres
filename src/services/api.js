import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // URL de tu API
});

export const getLegends = async (filters = {}) => {
    try {
        const response = await api.get('/legends/', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching legends:', error);
        return [];
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/categories/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}