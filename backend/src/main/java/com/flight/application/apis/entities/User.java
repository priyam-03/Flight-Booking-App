package com.blog.application.apis.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.blog.application.apis.utils.AppConstants;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = AppConstants.USER)
@Getter
@Setter
@NoArgsConstructor
public class User implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = AppConstants.USER_NAME, nullable = false)
    @NotBlank(message = AppConstants.USER_NAME_REQUIRED)
    private String name;

    @Column(unique = true)
    @Email(message = AppConstants.USER_EMAIL_INVALID)
    private String email;

    @Size(min = 8, message = AppConstants.PASSWORD_VALIDATION)
    @Pattern(regexp = AppConstants.PASSWORD_PATTERN)
    private String password;

    @Size(max = 10, message = AppConstants.ABOUT_MESSAGE)
    private String phoneNo;

    @OneToMany(mappedBy = AppConstants.USER, cascade = CascadeType.ALL)
    private List<Deal> Deals = new ArrayList<>();

    @OneToMany(mappedBy = AppConstants.USER, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> Bookings = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
