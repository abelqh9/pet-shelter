import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SeeAllPets from './views/SeeAllPets';
import See from './views/See';
import Create from './views/Create';
import Update from './views/Update';
import { SocketProvider } from './contexs/SocketContext';

function App() {

    return (
        <SocketProvider>
            <div className="container min-vh-100 pt-4 pb-4 d-flex flex-column gap-5">
                <BrowserRouter>
                    <Routes>
                        <Route path="/pets" element={<SeeAllPets />} />
                        <Route path="/pets/new" element={<Create />} />
                        <Route path="/pets/:id" element={<See />} />
                        <Route path="/pets/:id/edit" element={<Update />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </SocketProvider>
    );
}

export default App;