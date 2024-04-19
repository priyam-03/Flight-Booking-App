package com.blog.application.apis.controllers;

import com.blog.application.apis.dtos.JwtRequest;
import com.blog.application.apis.dtos.JwtResponse;
import com.blog.application.apis.dtos.UserDTO;
import com.blog.application.apis.helper.JwtHelper;
import com.blog.application.apis.services.UserService;
import com.blog.application.apis.utils.AppConstants;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.BASE_AUTH_URL)
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JwtHelper helper;
    private final UserService userService;

    @Autowired
    public AuthController(
            UserDetailsService userDetailsService,
            AuthenticationManager manager,
            JwtHelper helper,
            UserService userService) {
        this.userDetailsService = userDetailsService;
        this.manager = manager;
        this.helper = helper;
        this.userService = userService;
    }

    @PostMapping(AppConstants.REGISTER)
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDto) {
        UserDTO registeredUser = userService.registerNewUser(userDto);
        return new ResponseEntity<UserDTO>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping(AppConstants.LOGIN)
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody JwtRequest request) {
        this.doAuthenticate(request.getEmail(), request.getPassword());
        UserDTO userDetails = userService.getByMail(request.getEmail());
        UserDetails userDetails1 = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails1);

        JwtResponse response = JwtResponse
                .builder()
                .jwtToken(token)
                .userDTO(userDetails)
                .message(AppConstants.LOGGED_IN_SUCCESSFULLY)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Username or Password  !!");
        }

    }
}
