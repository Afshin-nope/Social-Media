package com.afshin.service;

import com.afshin.models.Chat;
import com.afshin.models.User;
import com.afshin.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImplementation implements ChatService{

    @Autowired
    private ChatRepository chatRepository;


    @Override
    public Chat createChat(User main, User second) {
        Chat exists = chatRepository.findChatByUsersId(main, second);
        if (exists!=null){
            return exists;
        }

        Chat chat = new Chat();
        chat.getUsers().add(main);
        chat.getUsers().add(second);
        chat.setTimeStamp(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception{
        Optional<Chat> optionalChat = chatRepository.findById(chatId);
        if (optionalChat.isEmpty()){
            throw new Exception("chat not found" + chatId);
        }

        return optionalChat.get();
    }

    @Override
    public List<Chat> findUsersChat(Integer userId) {
        return chatRepository.findByUsersId(userId);
    }
}
