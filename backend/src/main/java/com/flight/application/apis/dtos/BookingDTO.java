package com.blog.application.apis.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDTO {
    private Long bookingId;
    private RequestUser userDTO;
    private DealDTO dealDTO;

}
