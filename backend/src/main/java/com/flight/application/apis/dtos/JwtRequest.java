package com.blog.application.apis.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JwtRequest {
    private String email;
    private String password;
}
