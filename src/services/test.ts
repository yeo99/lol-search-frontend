import instance from "../utils/http";

export const getServerOk = async () => {
    try {
        const response = await instance.get('/users/test');
        return response.data
    } catch (error) {
        console.log("error fetching test user: ", error)
        throw error;
    }
};