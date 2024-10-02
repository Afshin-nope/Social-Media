package com.afshin.controller;

import com.afshin.models.Story;
import com.afshin.models.User;
import com.afshin.service.StoryService;
import com.afshin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/story")
    public Story createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        return storyService.createStory(story, user);
    }

    @GetMapping("/api/story/user/{userId}")
    public List<Story> findUserStory(@PathVariable Integer userId) throws Exception{
        //might need jwt
        return storyService.findStoryByUserId(userId);
    }
}
