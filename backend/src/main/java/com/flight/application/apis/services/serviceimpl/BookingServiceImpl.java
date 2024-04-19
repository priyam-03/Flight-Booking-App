package com.blog.application.apis.services.serviceimpl;

import com.blog.application.apis.dtos.BookingDTO;
import com.blog.application.apis.dtos.DealDTO;
import com.blog.application.apis.dtos.RequestUser;
import com.blog.application.apis.dtos.UserDTO;
import com.blog.application.apis.entities.Booking;
import com.blog.application.apis.entities.Deal;
import com.blog.application.apis.entities.User;
import com.blog.application.apis.exceptions.ResourceNotFoundException;
import com.blog.application.apis.repositories.BookingRepository;
import com.blog.application.apis.repositories.DealRepository;
import com.blog.application.apis.repositories.UserRepository;
import com.blog.application.apis.services.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingServiceImpl implements BookingService {

        private final BookingRepository bookingRepository;
        private final DealRepository dealRepository;
        private final UserRepository userRepository;
        private final ModelMapper modelMapper;

        @Autowired
        public BookingServiceImpl(
                        BookingRepository bookingRepository,
                        DealRepository dealRepository,
                        UserRepository userRepository,
                        ModelMapper modelMapper) {
                this.bookingRepository = bookingRepository;
                this.dealRepository = dealRepository;
                this.userRepository = userRepository;
                this.modelMapper = modelMapper;
        }

        @Override
        public BookingDTO bookDeal(Long dealId, Long userId) {
                log.info(">>> User " + userId + " liked the post " + dealId);
                Deal deal = dealRepository
                                .findById(dealId)
                                .orElseThrow(() -> new ResourceNotFoundException("Post ", dealId));
                User user = userRepository
                                .findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User ", userId));
                Booking booking = Booking
                                .builder()
                                .deal(deal)
                                .user(user)
                                .build();
                Booking savedBooking = bookingRepository.save(booking);
                BookingDTO bookingDTO = modelMapper.map(savedBooking, BookingDTO.class);
                DealDTO dealDTO = modelMapper.map(deal, DealDTO.class);
                RequestUser userDTO = modelMapper.map(user, RequestUser.class);
                bookingDTO.setDealDTO(dealDTO);
                bookingDTO.setUserDTO(userDTO);
                return bookingDTO;
        }

        @Override
        public List<BookingDTO> getAllbookingsByUserId(Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Deal ", userId));
                List<Booking> booking = bookingRepository.findByUser(user);
                // System.out.println(like.get(0).getDeal().getDeparturecity());
                return booking.stream().map(this::convertToDTO).collect(Collectors.toList());
        }

        private BookingDTO convertToDTO(Booking booking) {
                return BookingDTO.builder()
                                .bookingId(booking.getBookingId())
                                .userDTO(modelMapper.map(booking.getUser(), RequestUser.class))
                                .dealDTO(modelMapper.map(booking.getDeal(), DealDTO.class))
                                .build();
        }
}
