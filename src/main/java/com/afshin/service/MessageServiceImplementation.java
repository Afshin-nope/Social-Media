package com.afshin.service;

import com.afshin.models.Chat;
import com.afshin.models.Message;
import com.afshin.models.User;
import com.afshin.repository.ChatRepository;
import com.afshin.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImplementation implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Message createMessage(User user, Integer chatId, Message message) throws Exception{
        Chat chat = chatService.findChatById(chatId);
        Message newMessage = new Message();

        newMessage.setChat(chat);
        newMessage.setContent(message.getContent());
        newMessage.setImage(message.getImage());
        newMessage.setUser(user);
        newMessage.setTimeStamp(LocalDateTime.now());
        Message savedMessage = messageRepository.save(newMessage);
        chat.getMessages().add(savedMessage);
        chatRepository.save(chat);
        return savedMessage;
    }

    @Override
    public List<Message> findChatsMessages(Integer chatId) throws Exception {
        Chat chat = chatService.findChatById(chatId);
        return messageRepository.findByChatId(chatId);
    }
}
