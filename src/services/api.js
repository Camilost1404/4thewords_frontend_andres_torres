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

export const getLegendById = async (id) => {
    try {
        const response = await api.get(`/legends/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching legend:', error);
        return null;
    }
}

export const updateLegend = async (id, data) => {
    try {
        const response = await api.patch(`/legends/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating legend:', error);
        return null;
    }
}

export const createLegend = async (data) => {
    try {
        const response = await api.post('/legends/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating legend:', error);
        return null;
    }
}

export const deleteLegend = async (id) => {
    try {
        const response = await api.delete(`/legends/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting legend:', error);
        return null;
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

export const getProvinces = async () => {
    try {
        const response = await api.get("/provinces/");
        return response.data;
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
    }
};