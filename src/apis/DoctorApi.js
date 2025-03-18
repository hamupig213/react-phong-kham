import axios from "axios";

// const getAllDoctors = () => {
//     axios
//         .get("https://localhost:7183/api/doctor")
//         .then((response) => {
//             // setDoctors(response.data); // Lưu vào state
//             return response.data;
//         })
//         .catch((error) => {
//             console.error("Lỗi khi gọi API:", error);
//         });
// };

const getAllDoctors = async () => {
    try {
        const response = await axios.get("https://localhost:7183/api/doctor");
        return response.data; // Trả về dữ liệu bác sĩ
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
};

export { getAllDoctors };
