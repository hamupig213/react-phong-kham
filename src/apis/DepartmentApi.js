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

export { getAllDepartments };
