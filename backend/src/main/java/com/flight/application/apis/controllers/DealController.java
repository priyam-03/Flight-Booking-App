package com.blog.application.apis.controllers;

import com.blog.application.apis.dtos.DealDTO;
import com.blog.application.apis.payloads.ApiResponse;

import com.blog.application.apis.services.serviceimpl.DealServiceImpl;
import com.blog.application.apis.utils.AppConstants;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(AppConstants.POST_BASE_URL)
public class DealController {

    private final DealServiceImpl dealService;

    @Autowired
    DealController(DealServiceImpl dealService) {
        this.dealService = dealService;

    }

    @PostMapping(AppConstants.POST_CREATE_URL)
    public ResponseEntity<DealDTO> createDeal(@Valid @RequestBody DealDTO dealDTO, @PathVariable Long userId) {
        DealDTO dealDTO1 = dealService.createDeal(dealDTO, userId);
        return new ResponseEntity<>(dealDTO1, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DealDTO>> getAllDeals() {
        List<DealDTO> dealDTOS = dealService.getAllDeal();
        return new ResponseEntity<>(dealDTOS, HttpStatus.OK);
    }

    @GetMapping(AppConstants.POST_ID)
    public ResponseEntity<DealDTO> getDealById(@PathVariable Long dealId) {
        DealDTO dealDTO = dealService.getDealById(dealId);
        return new ResponseEntity<>(dealDTO, HttpStatus.OK);
    }

    @GetMapping(AppConstants.POST_USER_ID)
    public ResponseEntity<List<DealDTO>> getDealByUser(@PathVariable Long userId) {
        List<DealDTO> dealDTOS = dealService.getAllDealByUser(userId);
        return new ResponseEntity<>(dealDTOS, HttpStatus.OK);
    }

    @DeleteMapping(AppConstants.POST_ID)
    public ResponseEntity<ApiResponse> deleteDeal(@PathVariable Long dealId) {
        dealService.deleteDeal(dealId);
        return new ResponseEntity<>(new ApiResponse("Deal deleted successfully !", true), HttpStatus.OK);
    }

    @PutMapping(AppConstants.POST_ID)
    public ResponseEntity<DealDTO> updateDeal(@RequestBody DealDTO dealDTO, @PathVariable Long dealId) {
        DealDTO dealDTO1 = dealService.updateDeal(dealDTO, dealId);
        return new ResponseEntity<>(dealDTO1, HttpStatus.OK);
    }

    // @GetMapping(AppConstants.POST_SEARCH)
    // public ResponseEntity<List<DealDTO>> searchDeal(@RequestParam String title) {
    // List<DealDTO> dealDTOS = dealService.searchDeals(title);
    // return new ResponseEntity<>(dealDTOS, HttpStatus.OK);
    // }

}
