package com.afshin.service;

import com.afshin.models.Story;
import com.afshin.models.User;
import com.afshin.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImplementation implements StoryService{

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserService userService;

    @Override
    public Story createStory(Story story, User user) {
        Story newStory = new Story();
        newStory.setUser(user);
        newStory.setCaption(story.getCaption());
        newStory.setImage(story.getImage());
        newStory.setTimeStamp(LocalDateTime.now());

        return storyRepository.save(newStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception{
        User user = userService.findUserById(userId);
        return storyRepository.findByUserId(user.getId());
    }
}
