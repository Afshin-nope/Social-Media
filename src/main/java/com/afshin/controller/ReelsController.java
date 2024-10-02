package com.afshin.controller;

import com.afshin.models.Reels;
import com.afshin.models.User;
import com.afshin.service.ReelsService;
import com.afshin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelsController {
    @Autowired
    private ReelsService reelsService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/reels")
    public Reels createReels (@RequestBody Reels reels, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        Reels createdReel = reelsService.createReel(reels, user);
        return createdReel;
    }

    @GetMapping("/api/reels")
    public List<Reels> findAllReels (){
        return reelsService.findAllReels();
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUserReels (@PathVariable Integer userId) throws Exception{
        return reelsService.findUserReels(userId);
    }
}
