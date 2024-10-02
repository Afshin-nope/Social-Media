package com.afshin.service;

import com.afshin.models.Reels;
import com.afshin.models.User;
import com.afshin.repository.ReelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelsServiceImplementation implements ReelsService{
    @Autowired
    ReelsRepository reelsRepository;

    @Autowired
    UserService userService;

    @Override
    public Reels createReel(Reels reel, User user) {
        Reels newReel = new Reels();
        newReel.setUser(user);
        newReel.setVideo(reel.getVideo());
        newReel.setTitle(reel.getTitle());
        return reelsRepository.save(newReel);
    }

    @Override
    public List<Reels> findAllReels() {
        return reelsRepository.findAll();
    }

    @Override
    public List<Reels> findUserReels(Integer userId) throws Exception {
        userService.findUserById(userId);
        return reelsRepository.findByUserId(userId);
    }
}
