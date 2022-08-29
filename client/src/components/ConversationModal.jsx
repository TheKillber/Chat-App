import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationProvider";

const ConversationModal = ({ closeModal }) => {
   const { contacts } = useContacts();
   const [selectedContactsIds, setselectedContactsIds] = useState([]);
   const { createConversation } = useConversations();

   const handleSubmit = (e) => {
      e.preventDefault();
      createConversation(selectedContactsIds);
      closeModal();
   };

   const handleCheckboxChange = (id) => {
      setselectedContactsIds((prev) => {
         if (prev.includes(id))
            return prev.filter((prevId) => {
               return id !== prevId;
            });
         return [...prev, id];
      });
   };

   return (
      <>
         <Modal.Header closeButton>Create Conversation</Modal.Header>
         <Modal.Body>
            <Form onSubmit={handleSubmit}>
               {contacts.map((contact) => (
                  <Form.Group controlId={contact.id} key={contact.id}>
                     <Form.Check
                        type="checkbox"
                        value={selectedContactsIds.includes(contact.id)}
                        label={contact.name}
                        onChange={() => handleCheckboxChange(contact.id)}
                     ></Form.Check>
                  </Form.Group>
               ))}

               <Button type="submit" className="my-2">
                  Create
               </Button>
            </Form>
         </Modal.Body>
      </>
   );
};

export default ConversationModal;
