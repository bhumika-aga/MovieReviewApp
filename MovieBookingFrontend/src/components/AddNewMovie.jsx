import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movieRequest, setMovieRequest] = useState({
    movieName: "",
    theatreName: "",
    ticketsAvailable: 0,
    ticketStatus: "",
    poster: undefined,
  });

  useEffect(() => {
    console.log(movieRequest.poster);
  }, [movieRequest]);

  const [newMovieAddError, setNewMovieAddError] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieRequest({ ...movieRequest, [name]: value });
    setHasError(false);
    setNewMovieAddError("");
  };

  const handleAddTheatre = (event) => {
    setMovieRequest({
      ...movieRequest,
      theatreName: event.target.value,
    });
    setHasError(false);
    setNewMovieAddError("");
  };

  const verifyNewMovieRequest = () => {
    if (movieRequest.movieName === "") {
      setNewMovieAddError("Please Enter the Movie Name");
      setHasError(true);
    } else if (movieRequest.theatreName === "") {
      setNewMovieAddError("Please Enter the Theatre Name");
      setHasError(true);
    } else if (movieRequest.ticketsAvailable === 0) {
      setNewMovieAddError("Please Select the Number of Tickets Available");
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleSubmit = (event) => {
    verifyNewMovieRequest();
    event.preventDefault();

    const formData = new FormData();
    formData.append("movieName", movieRequest.movieName);
    formData.append("theatreName", movieRequest.theatreName);
    formData.append("ticketsAvailable", movieRequest.ticketsAvailable);
    formData.append("ticketStatus", movieRequest.ticketStatus);
    formData.append("imageFile", movieRequest.poster);

    console.log("Movie Request Submitted!");
    MovieService.saveMovie(formData)
      .then((response) => {
        navigate("/movieList");
      })
      .catch((error) => {
        if (error.response.data.message.includes("JWT Token Expired!")) {
          setNewMovieAddError("Session timed out. Please login again.");
        } else if (
          error.response.data.message.includes("Request Header Missing!")
        ) {
          setNewMovieAddError(
            "You are not logged in. Please login to proceed."
          );
        } else {
          setNewMovieAddError(
            "Some unexpected error has occurred. Please contact admin."
          );
        }
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setMovieRequest({
      movieName: "",
      theatreName: "",
      ticketsAvailable: "",
      ticketStatus: "",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
      <form>
        <div className="container mb-4 border-4 rounded">
          <label
            htmlFor="movieName"
            className="block font-medium mt-2 mb-2 ml-3"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            value={movieRequest.movieName}
            onChange={handleChange}
            className="w-4/5 p-2 border border-gray-300 rounded ml-3 mb-4"
            required
          />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="mb-4 border-4 rounded">
              <div>
                <label
                  htmlFor={`theatreName`}
                  className="block font-medium mt-2 mb-1 ml-3"
                >
                  Theatre Name
                </label>
                <input
                  type="text"
                  id={`theatreName`}
                  name="theatreName"
                  value={movieRequest.theatreName}
                  onChange={(event) => handleAddTheatre(event)}
                  className="w-4/5 p-1 border border-gray-300 rounded ml-3"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`availableSeat`}
                  className="block font-medium mb-1 mt-2 ml-3"
                >
                  Available Seat
                </label>
                <input
                  type="text"
                  id={`availableSeat`}
                  name="availableSeat"
                  value={movieRequest.ticketsAvailable}
                  onChange={(event) => {
                    setMovieRequest({
                      ...movieRequest,
                      ticketsAvailable: event.target.value,
                    });
                    setHasError(false);
                    setNewMovieAddError("");
                  }}
                  className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-1"
                />
              </div>

              <div>
                <label
                  htmlFor={`ticketStatus`}
                  className="block font-medium mb-1 mt-2 ml-3"
                >
                  Booking Status
                </label>
                <select
                  id={`ticketStatus`}
                  name="ticketStatus"
                  value={movieRequest.ticketStatus}
                  onChange={(event) =>
                    setMovieRequest({
                      ...movieRequest,
                      ticketStatus: event.target.value,
                    })
                  }
                  className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-2"
                >
                  <option value="">Select...</option>
                  <option value="AVAILABLE"> AVAILABLE</option>
                  <option value="BOOK ASAP"> BOOK ASAP</option>
                  <option value="SOLD OUT"> SOLD OUT</option>
                </select>

                <div>
                  <label
                    htmlFor="poster"
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Select Image
                  </label>
                  <input
                    type="file"
                    id="poster"
                    name="poster"
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={(event) =>
                      setMovieRequest({
                        ...movieRequest,
                        poster: event.target.files[0],
                      })
                    }
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {newMovieAddError && (
          <p className="mb-4 text-sm text-red-600">{newMovieAddError}</p>
        )}
        {!hasError && (
          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
              disabled={hasError}
              onClick={handleSubmit}
              className="rounded mr-4 text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
            >
              Save
            </button>
            <button
              onClick={reset}
              className="rounded ml-4 text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
            >
              Clear
            </button>
            <button
              onClick={() => navigate("/movieList")}
              className="rounded text-white font-semibold bg-violet-500 hover:bg-violet-700 py-2 px-6"
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddMovie;