import React from "react";
import "../index.css";

const BookedTicketDetails = ({ bookedTicket }) => {
  return (
    <div className="container mx-auto my-8 max-w-lg">
      <div className="flex justify-center">
        <h6 className="flex justify-center rounded mb-6 max-w-lg bg-slate-600 text-white px-6 py-2 font-semibold">
          Congratulations {bookedTicket.username}! Your Booking is Confirmed!
        </h6>
      </div>
      <div className="flex justify-center shadow border-b w-auto">
        <table className="min-w-fit">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6">
                Booking Details:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left px-6 py-4 whitespace-nowrap">
                <ul className="list-disc list-inside text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer hover:font-extrabold">
                  <li>Movie: {bookedTicket.movieName}</li>
                  <li>Theatre: {bookedTicket.theatreName}</li>
                  <li>Number of Tickets Booked: {bookedTicket.noOfTickets}</li>
                  <li className="whitespace-normal">
                    Seat Number Allotted: {bookedTicket.seatNumber.join(", ")}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedTicketDetails;
