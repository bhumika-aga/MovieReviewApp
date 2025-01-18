import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";
import Movie from "./Movie";

const MovieList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [newMovieAddError, setNewMovieAddError] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("userType");
    setIsAdmin(role);
  }, [isAdmin, location]);

  const filterArray = (data) => {
    const filteredArray = [];
    const array = data.map((object) => {
      if (!filteredArray.some((item) => item.movieName === object.movieName)) {
        filteredArray.push(object);
      }
    });
    return filteredArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await MovieService.getMovies();
        const uniqueArray = filterArray(response.data);
        setMovies(uniqueArray);
      } catch (error) {
        console.log("catching");
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteMovie = (e, movieName) => {
    e.preventDefault();
    MovieService.deleteMovie(movieName)
      .then((result) => {
        if (movies) {
          setMovies((previousElement) => {
            return previousElement.filter(
              (movie) => movie.movieName !== movieName
            );
          });
        }
      })
      .catch((error) => {
        if (error.response.data.message.includes("Required request header")) {
          setNewMovieAddError(
            "Yu are not logged in. Kindly login before proceeding."
          );
        }
      });
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="rounded flex justify-center text-xl font-bold mb-4 mt-8 bg-slate-600 text-white px-6 py-2">
        Welcome! Book Your Movie Tickets Here!
      </h2>
      <div className="flex justify-center">
        {isAdmin === "ROLE_ADMIN" && (
          <button
            onClick={() => navigate("/add-movie")}
            className="flex justify-center rounded mb-6 max-w-lg bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            Add New Released Movie
          </button>
        )}
      </div>

      <div className="flex justify-center shadow border-b w-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!loading &&
            movies.map((movie) => (
              <Movie
                movie={movie}
                deleteMovie={deleteMovie}
                role={isAdmin}
                key={movie.movieId}
              />
            ))}
        </div>
      </div>

      {newMovieAddError && (
        <p className="mb-4 text-sm text-red-600">{newMovieAddError}</p>
      )}
    </div>
  );
};

export default MovieList;
