package com.blog.application.apis.dtos;

import com.blog.application.apis.utils.AppConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private Long id;

    @NotNull
    @NotBlank(message = AppConstants.USER_NAME_REQUIRED)
    private String name;

    @Email(message = AppConstants.USER_EMAIL_INVALID)
    private String email;

    @NotNull
    @Size(min = 8, message = AppConstants.PASSWORD_VALIDATION)
    private String password;

    @NotNull
    @Size(max = 10, message = AppConstants.ABOUT_MESSAGE)
    private String phoneNo;

}
