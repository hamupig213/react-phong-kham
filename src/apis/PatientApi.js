import axios from "axios";

const getAllPatients = async () => {
    try {
        const response = await axios.get("https://localhost:7183/api/patient");
        return response.data; // Trả về dữ liệu bác sĩ
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
};

export { getAllPatients };
