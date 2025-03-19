import axios from "axios";

const getAllDoctors = async () => {
    try {
        const response = await axios.get("https://localhost:7183/api/doctor");
        return response.data; // Trả về dữ liệu
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
};

const getDoctorById = async (id) => {
    try {
        const response = await axios.get(
            `https://localhost:7183/api/doctor/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
    }
};

const createDoctor = async (doctor) => {
    try {
        const response = await axios.post(
            "https://localhost:7183/api/doctor",
            doctor
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
    }
};

const updateDoctor = async (doctor) => {
    try {
        const response = await axios.put(
            `https://localhost:7183/api/doctor/${doctor.id}`,
            doctor
        );
        return response.data;
    } catch (error) {
        console.log("Lỗi khi call Api: ", error);
        return null;
    }
};

const deleteDoctor = async (doctor) => {
    try {
        const response = await axios.delete(
            `https://localhost:7183/api/doctor/${doctor.id}`
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
    }
};

export {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};
