package com.blog.application.apis.dtos;

import com.blog.application.apis.utils.AppConstants;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import com.blog.application.apis.dtos.UserDTO;

@Getter
@Setter
@Builder
public class JwtResponse {
    private String jwtToken;
    private UserDTO userDTO;
    private String message;

}
