import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion"; //from smooth transitions and animation we are using teh framer-motion library
const FirstStep = (props) => {
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    props.updateUser(data);
    navigate("/second");
  };
  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            autoComplete="off"
            placeholder="Enter your first name "
            {...register("first_name", {
              required: "First Name is required",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "First name should only contain letters ",
              },
            })}
            className={`${errors.first_name ? "input-error" : ""}`}
          />
          {errors.first_name && (
            <p className="errorMsg">{errors.first_name.message}</p>
          )}
        </Form.Group>
        <br />
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            autoComplete="off"
            placeholder="Enter your last name "
            {...register("last_name", {
              required: "Last Name is required",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Lab name should only contain letters ",
              },
            })}
            className={`${errors.last_name ? "input-error" : ""}`}
          />
          {errors.last_name && (
            <p className="errorMsg">{errors.last_name.message}</p>
          )}
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};
export default FirstStep;
