package com.blog.application.apis.services;

import com.blog.application.apis.dtos.BookingDTO;

import java.util.List;

public interface BookingService {
    BookingDTO bookDeal(Long dealId, Long userId);

    // void unlikePost(Long likeId);

    List<BookingDTO> getAllbookingsByUserId(Long userId);
}
