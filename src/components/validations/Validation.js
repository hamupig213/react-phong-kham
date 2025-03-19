const validateYear = async (_, value) => {
    const currentYear = new Date().getFullYear();
    if (!value) {
        return Promise.reject(new Error("Vui lòng nhập năm sinh"));
    }
    if (!/^(19\d{2}|20\d{2})$/.test(value)) {
        return Promise.reject(
            new Error("Năm sinh phải từ 1900 đến năm hiện tại")
        );
    }
    if (value < 1900 || value > currentYear) {
        return Promise.reject(
            new Error(`Năm sinh phải từ 1900 đến ${currentYear}`)
        );
    }
    return Promise.resolve();
};
export { validateYear };
