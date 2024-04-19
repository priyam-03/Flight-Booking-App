package com.blog.application.apis.dtos;

import com.blog.application.apis.utils.AppConstants;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DealDTO {
    private Long dealId;

    private RequestUser user;

    private String createdAt;
    private String updatedAt;
    private String departurecity;
    private String arrivalcity;
    private String validStill;
    private String departureTime;
    private String arrivalTime;
    private String seats;
    private String fare;
    private String oldfare;

    private List<BookingDTO> bookings = new ArrayList<>();
}
