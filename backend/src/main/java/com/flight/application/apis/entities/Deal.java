package com.blog.application.apis.entities;

import com.blog.application.apis.utils.AppConstants;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "deal")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Deal implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dealId;

    private String departurecity;
    private String arrivalcity;
    private String validStill;
    private String departureTime;
    private String arrivalTime;
    private String seats;
    private String fare;
    private String oldfare;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "deal", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

}
