package com.blog.application.apis.services.serviceimpl;

import com.blog.application.apis.dtos.BookingDTO;
import com.blog.application.apis.dtos.DealDTO;
import com.blog.application.apis.entities.*;
import com.blog.application.apis.exceptions.ResourceNotFoundException;

import com.blog.application.apis.repositories.DealRepository;
import com.blog.application.apis.repositories.UserRepository;
import com.blog.application.apis.services.BookingService;
import com.blog.application.apis.services.DealService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    private final BookingService likeService;

    @Autowired
    DealServiceImpl(DealRepository dealRepository, ModelMapper modelMapper, UserRepository userRepository,
            BookingService likeService) {
        this.dealRepository = dealRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;

        this.likeService = likeService;
    }

    @Override
    public DealDTO createDeal(DealDTO postDTO, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId));

        Deal post = modelMapper.map(postDTO, Deal.class);
        post.setUser(user);

        Deal savedPost = dealRepository.save(post);
        return modelMapper.map(savedPost, DealDTO.class);
    }

    @Override
    public DealDTO updateDeal(DealDTO dealDTO, Long dealId) {
        Deal post = dealRepository.findById(dealId).orElseThrow(() -> new ResourceNotFoundException("Post", dealId));
        post.setArrivalcity(dealDTO.getArrivalcity());
        post.setDeparturecity(dealDTO.getDeparturecity());
        post.setValidStill(dealDTO.getValidStill());
        post.setArrivalTime(dealDTO.getArrivalTime());
        post.setDeparturecity(dealDTO.getDeparturecity());
        post.setFare(post.getFare());
        post.setOldfare(post.getOldfare());
        post.setSeats(post.getSeats());

        Deal updatedPost = dealRepository.save(post);
        return modelMapper.map(updatedPost, DealDTO.class);
    }

    @Override
    public void deleteDeal(Long dealId) {
        Deal post = dealRepository.findById(dealId).orElseThrow(() -> new ResourceNotFoundException("Post", dealId));
        dealRepository.delete(post);
    }

    @Override
    public List<DealDTO> getAllDeal() {
        List<Deal> posts = dealRepository.findAll();
        return posts.stream().map(post -> {
            DealDTO postDTO = modelMapper.map(post, DealDTO.class);
            return postDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public DealDTO getDealById(Long dealId) {
        Deal post = dealRepository.findById(dealId).orElseThrow(() -> new ResourceNotFoundException("Post", dealId));

        DealDTO postDTOs = modelMapper.map(post, DealDTO.class);

        return postDTOs;
    }

    @Override
    public List<DealDTO> getAllDealByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId));
        List<Deal> posts = dealRepository.findByUser(user);
        return posts.stream().map(post -> modelMapper.map(post, DealDTO.class)).collect(Collectors.toList());
    }

    // @Override
    // public List<DealDTO> searchDeals(String keyword) {
    // List<Deal> posts = dealRepository.findByTitleContaining(keyword);
    // return posts.stream()
    // .map(post -> modelMapper.map(post, DealDTO.class))
    // .collect(Collectors.toList());
    // }

}
