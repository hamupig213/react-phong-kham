import axios from "axios";

const getAllDepartments = async () => {
    try {
        const res = await axios.get("https://localhost:7183/api/department");
        return res.data;
    } catch (e) {
        console.error('Lỗi khi gọi Api:', e);
        return [];
    }
};

const getDepartmentById = async (id) => {
    try {
        const response = await axios.get(
            `https://localhost:7183/api/department/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
    }
};


export { getAllDepartments, getDepartmentById };
