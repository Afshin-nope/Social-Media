package com.afshin.service;

import com.afshin.models.Chat;
import com.afshin.models.User;

import java.util.List;

public interface ChatService {

    public Chat createChat(User main, User second);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findUsersChat(Integer userId);
}
