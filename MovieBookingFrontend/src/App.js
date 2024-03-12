import "./App.css";
import AddNewMovie from "./components/AddNewMovie";
import BookTicket from "./components/BookTicket";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import ResetPassword from "./components/ResetPassword";
import TheaterList from "./components/TheatreList";
import UpdateMovie from "./components/UpdateMovie";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route index element={<MovieList />} />
                    <Route exact path="/" element={<MovieList />} />
                    <Route path="/movieList" element={<MovieList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/theater-list" element={<TheaterList />} />
                    <Route path="/book-ticket" element={<BookTicket />} />
                    <Route path="/add-movie" element={<AddNewMovie />} />
                    <Route path="/edit-movie/:movieName" element={<UpdateMovie />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;