package com.blog.application.apis.repositories;

import com.blog.application.apis.dtos.DealDTO;

import com.blog.application.apis.entities.Deal;
import com.blog.application.apis.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findByUser(User user);

}
