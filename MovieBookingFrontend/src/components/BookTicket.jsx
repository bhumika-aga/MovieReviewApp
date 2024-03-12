import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";
import BookedTicketDetails from "./BookedTicketDetails";

const BookTicket = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const tMovie = locate.state && locate.state.movie;
  const index = locate.state && locate.state.index;
  const availableSeat = tMovie.ticketsAvailable;

  const [bookedTicket, setBookedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketBookingError, setTicketBookingError] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [bookingDetailsError, setBookingDetailsError] = useState("");
  const [movieBooking, setMovieBooking] = useState({
    movieName: tMovie.movieName,
    theatreName: tMovie.theatreName,
    noOfTickets: "",
    seatNumber: "",
  });

  const handleTicketChange = (event) => {
    const { name, value } = event.target;
    if (name === "seatNumber") {
      setMovieBooking({ ...movieBooking, [name]: value.split(",") });
    } else {
      setMovieBooking({ ...movieBooking, [name]: value });
    }
  };

  const verifyBookingRequest = (event) => {
    if (movieBooking.noOfTickets < 1) {
      setTicketBookingError("Please Enter Valid Number of Tickets to Book.");
      setHasErrors(true);
      return false;
    } else if (movieBooking.noOfTickets > availableSeat) {
      setTicketBookingError(
        "Sorry! Number of seats selected is more than the capacity."
      );
      setHasErrors(true);
      return false;
    } else if (movieBooking.setNumber.length > movieBooking.noOfTickets) {
      setTicketBookingError(
        "Selected seat numbers cannot exceed number of ticktes!"
      );
      setHasErrors(true);
      return false;
    } else if (movieBooking.setNumber.length === 0) {
      setTicketBookingError("Please select seats before proceeding.");
      setHasErrors(true);
      return false;
    } else {
      setTicketBookingError("");
      setHasErrors(false);
      return true;
    }
  };

  const handleTicketBooking = (e) => {
    e.preventDefault();
    if (verifyBookingRequest(e)) {
      console.log("if verifyBookingRequest... " + JSON.stringify(movieBooking));
      MovieService.bookMovieTicket(movieBooking, movieBooking.movieName)
        .then((response) => {
          setBookedTicket(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setTicketBookingError(error.response.data);
          if (error.response.data.message.includes("JWT Expired")) {
            setBookingDetailsError("Session Expired! Please login again.");
          } else if (
            error.response.data.message.includes("Required request header")
          ) {
            setBookingDetailsError("Kindly login before proceeding.");
          } else {
            setBookingDetailsError(
              "Some unexpected error has occurred! Please contact admin."
            );
          }
        });
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto my-auto">
        <h2 className="flex justify-center text-4xl font-bold mb-4 mt-8">
          Book Movie Ticket
        </h2>
        {loading && (
          <form>
            <div className="flex mb-4">
              <label
                htmlFor="movieName"
                className="w-1/4 text-xl font-normal py-1 text-gray-700"
              >
                Movie:
              </label>
              <input
                type="text"
                id="movieName"
                name="movieName"
                required
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={movieBooking.movieName}
                readOnly
              />
            </div>

            <div className="flex mb-4">
              <label
                htmlFor="theatreName"
                className="w-1/4 text-xl font-normal py-1 text-gray-700"
              >
                Theatre:
              </label>
              <input
                type="text"
                id="theatreName"
                name="theatreName"
                required
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={movieBooking.theatreName}
                readOnly
              />
            </div>

            <div className="flex mb-4">
              <label
                htmlFor="availableSeat"
                className="w-1/4 text-xl font-normal py-1 text-gray-700"
              >
                Available Seats:
              </label>
              <input
                type="text"
                id="availableSeat"
                name="availableSeat"
                autoComplete="email"
                required
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={availableSeat}
                readOnly
              />
            </div>

            <div className="flex mb-4">
              <label
                htmlFor="noOfTickets"
                className="w-1/4 text-xl font-normal py-1 text-gray-700"
              >
                Tickets:
              </label>
              <input
                type="tel"
                id="noOfTickets"
                name="noOfTickets"
                required
                pattern="[0-9]{10}"
                maxLength={2}
                placeholder="Enter the number of seats you want to book"
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={movieBooking.noOfTickets}
                onChange={(e) => handleTicketChange(e)}
              />
            </div>

            <div className="flex mb-4">
              <label
                htmlFor="seatNumber"
                className="w-1/4 text-xl font-normal py-1 text-gray-700"
              >
                Seat Numbers:
              </label>
              <input
                type="tel"
                id="seatNumber"
                name="seatNumber"
                required
                pattern="[A-Z]\d+"
                placeholder="Enter seat numbers you want to book"
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={movieBooking.seatNumber}
                onChange={(e) => handleTicketChange(e)}
              />
            </div>

            {ticketBookingError && (
              <p className="mt-2 text-sm text-red-600">{ticketBookingError}</p>
            )}

            <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
              <button
                onClick={(e) => handleTicketBooking(e)}
                className="rounded mr-4 text-white font-semibold bg-blue-500 hover:bg-blue-800 py-2 px-6"
              >
                Book
              </button>
              <button
                onClick={() => navigate("/movieList")}
                className="rounded mt-8 max-w-lg text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mx-auto"
              >
                Home
              </button>
              {bookingDetailsError && (
                <p className="mt-4 mb-4 text-sm text-red-600">
                  {bookingDetailsError}
                </p>
              )}
            </div>
          </form>
        )}
      </div>

      <div>
        {!loading && (
          <div>
            <BookedTicketDetails
              bookedTicket={movieBooking}
            ></BookedTicketDetails>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/movieList")}
                className="rounded max-w-lg text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mx-auto"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
