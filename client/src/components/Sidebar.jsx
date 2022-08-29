import React from "react";
import { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import ContactModal from "./ContactModal";
import Contacts from "./Contacts";
import ConversationModal from "./ConversationModal";
import Conversations from "./Conversations";

const conversationsKey = "conversations";
const contactsKey = "contacts";

const Sidebar = ({ id }) => {
   const [activeKey, setActiveKey] = useState(conversationsKey);
   const [openModal, setOpenModal] = useState(false);
   const conversationsOpen = activeKey === conversationsKey;

   const closeModal = () => {
      setOpenModal(false);
   };

   return (
      <div style={{ width: "250px" }} className="d-flex flex-column">
         <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant="tabs" className="justify-content-center">
               <Nav.Item>
                  <Nav.Link eventKey={conversationsKey}>Conversations</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link eventKey={contactsKey}>Contacts</Nav.Link>
               </Nav.Item>
            </Nav>
            <Tab.Content className="border-end overflow-auto flex-grow-1">
               <Tab.Pane eventKey={conversationsKey}>
                  <Conversations />
               </Tab.Pane>
               <Tab.Pane eventKey={contactsKey}>
                  <Contacts />
               </Tab.Pane>
            </Tab.Content>
            <div className="p-2 border-top border-end small">
               Your ID: <span className="text-muted">{id}</span>
            </div>
         </Tab.Container>
         <Button onClick={() => setOpenModal(true)} className="rounded-0">
            New {conversationsOpen ? "Conversation" : "Contact"}
         </Button>

         <Modal show={openModal} onHide={closeModal}>
            {conversationsOpen ? (
               <ConversationModal closeModal={closeModal} />
            ) : (
               <ContactModal closeModal={closeModal} />
            )}
         </Modal>
      </div>
   );
};

export default Sidebar;
