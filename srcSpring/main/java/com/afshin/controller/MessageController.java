package com.afshin.controller;

import com.afshin.models.Message;
import com.afshin.models.User;
import com.afshin.service.MessageService;
import com.afshin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//createMessage name
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestBody Message message, @RequestHeader("Authorization") String jwt, @PathVariable Integer chatId) throws Exception{
        User user = userService.findUserByJwt(jwt);
        return messageService.createMessage(user, chatId, message);
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> findChatsMessages(@RequestHeader("Authorization") String jwt, @PathVariable Integer chatId) throws Exception{
        User user = userService.findUserByJwt(jwt);
        return messageService.findChatsMessages(chatId);
        // TODO should check if user is in chat
    }
}
