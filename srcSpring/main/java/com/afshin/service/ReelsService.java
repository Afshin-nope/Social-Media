package com.afshin.service;

import com.afshin.models.Reels;
import com.afshin.models.User;

import java.util.List;

public interface ReelsService {
    public Reels createReel(Reels reel, User user);

    public List<Reels> findAllReels();

    public List<Reels> findUserReels(Integer userId) throws Exception;
}
