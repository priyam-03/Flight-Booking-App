package com.blog.application.apis.controllers;

import com.blog.application.apis.dtos.BookingDTO;
import com.blog.application.apis.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/booking")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/user/{userId}/post/{dealId}")
    public ResponseEntity<BookingDTO> likePost(
            @PathVariable Long dealId,
            @PathVariable Long userId) {
        BookingDTO bookingDTO = bookingService.bookDeal(dealId, userId);
        return new ResponseEntity<>(bookingDTO, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBooking(@PathVariable Long userId) {
        List<BookingDTO> bookingDTOs = bookingService.getAllbookingsByUserId(userId);
        return new ResponseEntity<>(bookingDTOs, HttpStatus.OK);
    }

}
