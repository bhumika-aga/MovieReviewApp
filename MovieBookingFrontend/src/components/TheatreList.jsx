import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";

const TheatreList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tMovie = location.state.movie;
  const movieName = tMovie.movieName;

  const [isAdmin, setIsAdmin] = useState("");
  const [theatreList, setTheatreList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = sessionStorage.getItem("userType");
    setIsAdmin(role);
  }, [isAdmin, location]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await MovieService.getMoviesByName(movieName);
        setTheatreList(response.data);
      } catch (error) {
        console.log("catching");
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const bookTicket = (e, index, movie) => {
    e.preventDefault();
    const bookTicketUrl = "/book-ticket";
    if (sessionStorage.getItem("token") == null) {
      navigate("/login", {
        state: { url: bookTicketUrl, movie: movie, index: index },
      });
    } else {
      navigate("/book-ticket", { state: { movie: movie, index: index } });
    }
  };

  return (
    <div className="container mx-auto my-20 max-w-2xl">
      <div className="flex justify-center">
        <h4 className="flex justify-center rounded mb-6 max-w-lg bg-slate-600 text-white px-6 py-2 font-semibold">
          Ticket Availability for {movieName}:{" "}
        </h4>
      </div>
      <div className="flex justify-center shadow border-b w-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6">
                Theatre Name
              </th>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6">
                Available Seat
              </th>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6">
                Booking Status
              </th>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {theatreList.map((movie, index) => (
              <tr key={index}>
                <td className="py-3 px-6 text-center">{movie.theatreName}</td>
                <td className="py-3 px-6 text-center">
                  {movie.ticketsAvailable}
                </td>
                <td className="py-3 px-6 text-center">{movie.ticketStatus}</td>
                <td className="py-3 px-6 text-center">
                  {movie.ticketsAvailable > 0 && (
                    <button
                      onClick={(e) => bookTicket(e, index, movie)}
                      className="btn btn-info text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
                    >
                      Book Ticket
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/movieList")}
          className="rounded mt-8 max-w-lg text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mx-auto"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TheatreList;
