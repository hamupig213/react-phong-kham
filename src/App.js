import "./App.css";
import PatientTable from "./components/tables/PatientTable.js";
import HeaderLayout from "./components/HeaderLayout.js";
import { BrowserRouter, Routes, Route, data } from "react-router-dom";
import DoctorTable from "./components/tables/DoctorTable.js";
import DepartmentTable from "./components/tables/DepartmentTable.js";

const listDoctors = [
    { id: "1", name: "Dr. A" },
    { id: "2", name: "Dr. B" },
];

const listDepartments = [
    { id: "1", name: "Khoa A" },
    { id: "2", name: "Khoa B" },
];

const listPatients = [
    {
        id: "1",
        name: "Nguyen Van A",
        birth_year: "2015",
        gender: "Nam",
        phone_number: "0123456789",
        doctor: "Dr. A",
        department: "Khoa A",
    },
    {
        id: "2",
        name: "Nguyen Van B",
        birth_year: "2016",
        gender: "Nam",
        phone_number: "0987654321",
        doctor: "Dr. B",
        department: "Khoa B",
    },
];

const doctorColumns = [
    {
        title: "Mã bác sĩ",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên bác sĩ",
        dataIndex: "name",
        key: "name",
    },
];

const departmentColumns = [
    {
        title: "Mã khoa/phòng",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên khoa/phòng",
        dataIndex: "name",
        key: "name",
    },
];

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <HeaderLayout></HeaderLayout>
                <Routes>
                    <Route
                        path="doctor"
                        element={
                            <DoctorTable
                                // listItems={doctors}
                                listColumns={doctorColumns}
                            />
                        }
                    />
                    <Route
                        path="department"
                        element={
                            <DepartmentTable
                                listItems={listDepartments}
                                listColumns={departmentColumns}
                            />
                        }
                    />
                    <Route
                        path="patient"
                        element={
                            <PatientTable
                                patients={listPatients}
                                doctors={listDoctors}
                                departments={listDepartments}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
