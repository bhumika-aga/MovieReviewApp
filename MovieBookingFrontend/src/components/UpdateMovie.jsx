import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieService from "../services/MovieService";

const UpdateMovie = () => {
  const navigate = useNavigate();
  const { movieName } = useParams();

  const [movie, setMovie] = useState({
    movieName: movieName,
    theatres: [
      {
        theatreName: "",
        availableSeat: "",
        ticketStatus: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MovieService.getTheatreByMovieName(movieName);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleMovieChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const theatres = [...movie.theatres];
    theatres[index] = { ...theatres[index], [name]: value };
    setMovie({ ...movie, theatres });
  };

  const handleAddTheatre = () => {
    setMovie({
      ...movie,
      theatres: [
        ...movie.theatres,
        {
          theatreName: "",
          availableSeat: "",
          ticketStatus: "",
        },
      ],
    });
  };

  const handleRemoveTheatre = (index) => {
    const theatres = [...movie.theatres];
    theatres.splice(index, 1);
    setMovie({ ...movie, theatres });
  };

  const updateMovie = (e) => {
    e.preventDefault();
    MovieService.updateMovie(movie, movieName)
      .then((response) => {
        navigate(".movieList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wmovieNameer">
          <h1>Update Movie</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Movie Name
          </label>
          <input
            type="text"
            name="movieName"
            value={movie.movieName}
            onChange={(event) => handleMovieChange(event)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col">
            {movie.theatres.map((theatre, index) => (
              <div key={index} className="mb-4 border-4 rounded">
                <div>
                  <label
                    htmlFor={`theatreName-${index}`}
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Theatre Name
                  </label>
                  <input
                    type="text"
                    id={`theatreName-${index}`}
                    name="theatreName"
                    value={theatre.theatreName}
                    onChange={(event) => handleChange(event, index)}
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`availableSeat-${index}`}
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Available Seat
                  </label>
                  <input
                    type="text"
                    id={`availableSeat-${index}`}
                    name="availableSeat"
                    value={theatre.availableSeat}
                    onChange={(event) => handleChange(event, index)}
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`ticketStatus-${index}`}
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Booking Status (BOOK ASAP/SOLDOUT)
                  </label>
                  <select
                    name="ticketStatus"
                    id={`ticketStatus-${index}`}
                    value={theatre.ticketStatus}
                    onChange={(event) => handleChange(event, index)}
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-2"
                  >
                    <option value="BOOK ASAP">BOOK ASAP</option>
                    <option value="SOLD OUT"> SOLD OUT</option>
                  </select>
                  {theatre.ticketStatus && (
                    <p>You have selected: {theatre.ticketStatus}</p>
                  )}
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTheatre(index)}
                    className="block mb-2 ml-auto mr-3 text-red-600 hover:text-red-800"
                  >
                    Remove Theatre
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddTheatre}
          className="block rounded-md bg-yellow-200 mb-4 text-blue-600 hover:text-blue-800 py-1 px-4"
        >
          Add Theatre
        </button>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateMovie}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/movieList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;