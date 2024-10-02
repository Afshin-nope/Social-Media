package com.afshin.controller;

import com.afshin.models.Chat;
import com.afshin.models.User;
import com.afshin.request.ChatRequest;
import com.afshin.service.ChatService;
import com.afshin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestBody ChatRequest chatRequest, @RequestHeader("Authorization") String jwt) throws Exception{
        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(chatRequest.getUserId());
        Chat chat =chatService.createChat(reqUser, user2);
        return chat;
    }

    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        return chatService.findUsersChat(user.getId());
    }
}
