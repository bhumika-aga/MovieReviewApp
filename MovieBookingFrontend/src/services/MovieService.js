import axios from "axios";

const MOVIE_API_BASE_URL = "http://localhost:8000/api/v1.0/moviebooking";

class MovieService {
    login(credentials) {
        return axios.post(MOVIE_API_BASE_URL + '/login', credentials);
    }

    register(register) {
        return axios.post(MOVIE_API_BASE_URL + '/register', register);
    }

    resetPassword(credentials, username) {
        return axios.put(MOVIE_API_BASE_URL + '/' + username + '/forgot', credentials);
    }

    saveMovie(data) {
        return axios.post(MOVIE_API_BASE_URL + '/add', data, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        });
    }

    getMovies() {
        axios.get(MOVIE_API_BASE_URL + '/all');
    }

    getMoviesByName(movieName) {
        return axios.get(MOVIE_API_BASE_URL + '/movie/search/' + movieName);
    }

    deleteMovie(movieName) {
        return axios.delete(MOVIE_API_BASE_URL + '/' + movieName + '/delete', {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        });
    }

    getTheatreByMovieName(movieName) {
        return axios.get(MOVIE_API_BASE_URL + '/theatres/' + movieName, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        });
    }

    updateMovie(movie, movieName) {
        return axios.put(MOVIE_API_BASE_URL + '/' + movieName + '/update', movie, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        });
    }

    bookMovieTicket(movieBooking, movieName) {
        return axios.post(MOVIE_API_BASE_URL + '/' + movieName + '/add', movieBooking, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        });
    }

    updateTheatre(movie, movieName, theatreName, ticket) {
        return axios.put(MOVIE_API_BASE_URL + '/' + movieName + '/' + theatreName + '/update' + ticket);
    }
}

export default new MovieService();