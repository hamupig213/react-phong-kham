import "./App.css";
import DoctorTable from "./components/DoctorTable.js";
import DepartmentTable from "./components/DepartmentTable.js";
import PatientTable from "./components/PatientTable.js";
import HeaderLayout from "./components/HeaderLayout.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <HeaderLayout></HeaderLayout>
                <Routes>
                    <Route
                        path="doctor"
                        element={<DoctorTable doctors={listDoctors} />}
                    />
                    <Route
                        path="department"
                        element={
                            <DepartmentTable departments={listDepartments} />
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
