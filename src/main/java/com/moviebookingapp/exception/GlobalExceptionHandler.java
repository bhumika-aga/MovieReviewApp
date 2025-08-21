package com.moviebookingapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends Exception {
    
    private static final long serialVersionUID = 1L;
    
    @ExceptionHandler(MovieNotFoundException.class)
    public ResponseEntity<String> incaseOfMovieNotFound(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(SeatAlreadyBookedException.class)
    public ResponseEntity<String> incaseOfSeatsAlreadyBooked(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}