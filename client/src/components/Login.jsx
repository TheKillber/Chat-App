import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

const Login = ({ onIdSubmit }) => {
   const idRef = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();
      onIdSubmit(idRef.current.value);
   };

   const createNewId = () => {
      onIdSubmit(uuidV4());
   };

   return (
      <Container className="align-items-center d-flex vh-100">
         <Form className="w-100" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
               <Form.Label>Enter your ID</Form.Label>
               <Form.Control type="text" ref={idRef}></Form.Control>
            </Form.Group>
            <Button type="submit">Login</Button>
            <Button variant="secondary" className="m-2" onClick={createNewId}>
               Create new Id
            </Button>
         </Form>
      </Container>
   );
};

export default Login;
