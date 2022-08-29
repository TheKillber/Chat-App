import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationContext = React.createContext();

export function useConversations() {
   return useContext(ConversationContext);
}

export function ConversationProvider({ id, children }) {
   const [conversations, setConversations] = useLocalStorage(
      "conversations",
      []
   );
   const [selectedConversationIndex, setSelectedConversationIndex] =
      useState(0);

   const { contacts } = useContacts();

   function createConversation(recipients) {
      setConversations((prevConversations) => {
         return [...prevConversations, { recipients, messages: [] }];
      });
   }

   const formattedConversations = conversations.map((conversation, index) => {
      const recipients = conversation.recipients.map((recipient) => {
         const contact = contacts.find((contact) => {
            return contact.id === recipient;
         });
         const name = (contact && contact.name) || recipient;
         return { id: recipient, name };
      });
      const messages = conversation.messages.map((message) => {
         const contact = contacts.find((contact) => {
            return contact.id === message.sender;
         });
         const name = (contact && contact.name) || message.sender;
         const fromMe = id === message.sender;
         return { ...message, senderName: name, fromMe };
      });
      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
   });

   const addMessageToConversations = useCallback(
      ({ recipients, text, sender }) => {
         setConversations((prev) => {
            let madeChange = false;
            const newMessage = { sender, text };

            const newConversations = prev.map((conversation) => {
               if (arrayEquality(conversation.recipients, recipients)) {
                  madeChange = true;
                  return {
                     ...conversation,
                     messages: [...conversation.messages, newMessage],
                  };
               }
               return conversation;
            });

            if (madeChange) {
               return newConversations;
            } else {
               return [...prev, { recipients, messages: [newMessage] }];
            }
         });
      },
      [setConversations]
   );

   const socket = useSocket();

   useEffect(() => {
      if (socket === null) return;
      try {
         socket?.on("receive-message", addMessageToConversations);
         return () => socket?.off("receive-message");
      } catch (error) {
         console.log(error);
      }
   }, [socket, addMessageToConversations]);

   const sendMessage = (recipients, text) => {
      socket.emit("send-message", { recipients, text });

      addMessageToConversations({ recipients, text, sender: id });
   };

   const value = {
      conversations: formattedConversations,
      selectedConversation: formattedConversations[selectedConversationIndex],
      createConversation,
      sendMessage,
      selectConversationIndex: setSelectedConversationIndex,
   };

   return (
      <ConversationContext.Provider value={value}>
         {children}
      </ConversationContext.Provider>
   );
}

const arrayEquality = (a, b) => {
   if (a.length !== b.length) return false;
   a.sort();
   b.sort();

   return a.every((element, index) => {
      return element === b[index];
   });
};
