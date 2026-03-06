import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/rides';

export const bookRide = async (userId, pickup, drop, vehicle, distance) => {
    const response = await axios.post(`${API_BASE_URL}/book`, {
        userId, pickup, drop, vehicle, distance
    });
    return response.data;
};

export const getAvailableRides = async () => {
    const response = await axios.get(`${API_BASE_URL}/available`);
    return response.data;
};

export const acceptRide = async (rideId, driverId) => {
    const response = await axios.post(`${API_BASE_URL}/accept`, {
        rideId, driverId
    });
    return response.data;
};

export const startRide = async (rideId, otp) => {
    const response = await axios.post(`${API_BASE_URL}/start`, {
        rideId, otp
    });
    return response.data;
};

export const completeRide = async (rideId) => {
    const response = await axios.post(`${API_BASE_URL}/complete`, {
        rideId
    });
    return response.data;
};

export const getUserRides = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
};
