import "./App.css";
import PatientTable from "./components/tables/PatientTable.js";
import HeaderLayout from "./components/HeaderLayout.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorTable from "./components/tables/DoctorTable.js";
import DepartmentTable from "./components/tables/DepartmentTable.js";

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <HeaderLayout></HeaderLayout>
                <Routes>
                    <Route path="doctor" element={<DoctorTable />} />
                    <Route path="department" element={<DepartmentTable />} />
                    <Route path="patient" element={<PatientTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
