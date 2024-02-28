import React from "react";
import styled from "styled-components";
import { Plant } from "../interfaces";

type FormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: Plant;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = ({ handleSubmit, formData, handleChange }: FormProps) => {
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Name:</Label>
      <Input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <Label htmlFor="species">Species:</Label>
      <Input
        type="text"
        id="species"
        name="species"
        value={formData.species}
        onChange={handleChange}
      />

      <Label htmlFor="water">Water:</Label>
      <Input
        type="text"
        id="water"
        name="water"
        value={formData.water}
        onChange={handleChange}
      />

      <Label htmlFor="fertilize">Fertilize:</Label>
      <Input
        type="text"
        id="fertilize"
        name="fertilize"
        value={formData.fertilize}
        onChange={handleChange}
      />

      <Label htmlFor="description">Description:</Label>
      <Input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <Label htmlFor="light">Light:</Label>
      <Input
        type="text"
        id="light"
        name="light"
        value={formData.light}
        onChange={handleChange}
      />

      <Label htmlFor="size">Size:</Label>
      <Input
        type="text"
        id="size"
        name="size"
        value={formData.size}
        onChange={handleChange}
      />

      <Label htmlFor="image">Image:</Label>
      <Input
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <SubmitButton type="submit" value="Submit" />
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 15px;
  margin: 10px auto;
  padding: 40px;
  border: 1px solid green;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
  height: 25px;
`;

const SubmitButton = styled.input`
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  height: 50px;
`;
