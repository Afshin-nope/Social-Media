package com.afshin.service;

import com.afshin.models.Story;
import com.afshin.models.User;

import java.util.List;

public interface StoryService {

    public Story createStory(Story story, User user);

    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
