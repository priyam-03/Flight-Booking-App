package com.blog.application.apis.services;

import com.blog.application.apis.dtos.DealDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealService {

    DealDTO createDeal(DealDTO dealDTO, Long userId);

    DealDTO updateDeal(DealDTO dealDTO, Long dealId);

    void deleteDeal(Long dealId);

    List<DealDTO> getAllDeal();

    DealDTO getDealById(Long dealId);

    List<DealDTO> getAllDealByUser(Long userId);

    // List<DealDTO> searchDeals(String keyword);

}
