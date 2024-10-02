package com.afshin.service;

import com.afshin.models.Chat;
import com.afshin.models.Message;
import com.afshin.models.User;

import java.util.List;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message message) throws Exception;

    public List<Message> findChatsMessages(Integer chatId) throws Exception;
}
