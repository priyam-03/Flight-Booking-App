package com.blog.application.apis.services;

import com.blog.application.apis.dtos.UserDTO;
import java.util.List;

public interface UserService {

    UserDTO updateUser(UserDTO userDTO, Long id);

    UserDTO getUserById(Long id);

    List<UserDTO> getAllUsers();

    void deleteUser(Long id);

    UserDTO registerNewUser(UserDTO user);

    UserDTO getByMail(String email);

}
