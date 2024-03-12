import React from "react";
import styled from "styled-components";
import { Plant } from "../interfaces";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormProps = {
  handleSubmitForm: () => void;
  formData: Plant;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = ({ handleSubmitForm, formData, handleChange }: FormProps) => {
  const form = useForm<Plant>({
    defaultValues: {
      name: formData.name,
      species: formData.species,
      image: formData.image,
      size: formData.size,
      water: formData.water,
      fertilize: formData.fertilize,
      description: formData.description,
      light: formData.light,
    },

    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
  } = form;

  const { errors } = formState;

  const watchPlantName = watch("name");
  const watchSpeciesAndWater = watch(["species", "water"]);
  const watchForm = watch();

  const onSubmitForm = () => {
    handleSubmitForm();
  };

  const handleGetValue = () => {
    console.log("Get Values", getValues());
    console.log("Get Name", getValues("name"));
  };

  const handleSetValue = () => {
    setValue("name", "", {
      // shouldValidate: true,
      shouldDirty: true,
      // shouldTouch: true,
    });
  };

  return (
    <div>
      <FormContainer onSubmit={handleSubmit(onSubmitForm)} noValidate>
        <h3>Watch name plant: {watchPlantName}</h3>
        <h3>Watch species and water: {watchSpeciesAndWater}</h3>

        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: true })}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name?.message && <p>{errors.name?.message}</p>}

        <Label htmlFor="species">Species:</Label>
        <Input
          type="text"
          id="species"
          {...register("species")}
          value={formData.species}
          onChange={handleChange}
        />
        {errors.species?.message && <p>{errors.species?.message}</p>}

        <Label htmlFor="water">Water:</Label>
        <Input
          type="text"
          id="water"
          {...register("water")}
          value={formData.water}
          onChange={handleChange}
        />

        <Label htmlFor="fertilize">Fertilize:</Label>
        <Input
          type="text"
          id="fertilize"
          {...register("fertilize")}
          value={formData.fertilize}
          onChange={handleChange}
        />

        <Label htmlFor="description">Description:</Label>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: true,
          })}
          aria-invalid={errors.description ? "true" : "false"}
          value={formData.description}
          onChange={handleChange}
        />

        {errors.description?.type === "required" && (
          <p role="alert">Description is required</p>
        )}

        <Label htmlFor="light">Light:</Label>
        <Input
          type="text"
          id="light"
          {...register("light")}
          value={formData.light}
          onChange={handleChange}
        />

        <Label htmlFor="size">Size:</Label>
        <Input
          type="text"
          id="size"
          {...register("size")}
          value={formData.size}
          onChange={handleChange}
        />

        <Label htmlFor="image">Image:</Label>
        <Input
          type="text"
          id="image"
          {...register("image")}
          value={formData.image}
          onChange={handleChange}
        />

        <SubmitButton type="submit" value="Submit" />
      </FormContainer>
      <DevTool control={control} />
      <button onClick={handleGetValue}>Get values</button>
      <button onClick={handleSetValue}>Set value</button>
      <h3>Watch form values: {JSON.stringify(watchForm)}</h3>
    </div>
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
