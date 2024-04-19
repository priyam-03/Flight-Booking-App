package com.blog.application.apis.entities;

import com.blog.application.apis.utils.AppConstants;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = AppConstants.LIKE_TABLE)
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
