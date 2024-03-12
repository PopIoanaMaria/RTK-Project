import { useState } from "react";
import styled from "styled-components";
import { useAddPlantMutation } from "../RTK/service";
import { useNavigate } from "react-router-dom";
import { Paths } from "../paths";
import Form from "../ReusableComponents/Form";
import { Plant } from "../interfaces";

const AddPlant = () => {
  const navigate = useNavigate();

  const [addPlant] = useAddPlantMutation();

  const [formData, setFormData] = useState<Plant>({
    id: `${Math.floor(Math.random() * 1000)}`,
    name: "",
    species: "",
    water: "",
    fertilize: "",
    description: "",
    light: "",
    size: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addPlant(formData);
    navigate(Paths.PLANTS);
  };

  return (
    <div>
      <button onClick={() => navigate(Paths.PLANTS)}>Back</button>
      <Container>
        <Form
          handleSubmitForm={handleSubmit}
          formData={formData}
          handleChange={handleChange}
        />
      </Container>
    </div>
  );
};

export default AddPlant;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
