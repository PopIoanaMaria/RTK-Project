import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetPlantByIdQuery, useEditPlantMutation } from "../RTK/service";
import Form from "../ReusableComponents/Form";
import { Plant } from "../interfaces";

const EditPlant = () => {
  const navigate = useNavigate();

  const { plantId } = useParams<{ plantId: string }>();

  const { data: plantData } = useGetPlantByIdQuery(plantId!);

  const [editPlant] = useEditPlantMutation();

  const [formData, setFormData] = useState<Plant>({
    id: plantData?.id ?? "",
    name: plantData?.name ?? "",
    species: plantData?.species ?? "",
    water: plantData?.water ?? "",
    fertilize: plantData?.fertilize ?? "",
    description: plantData?.description ?? "",
    light: plantData?.light ?? "",
    size: plantData?.size ?? "",
    image: plantData?.image ?? "",
  });

  const handleEditPlant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    editPlant({ id: plantData?.id!, editPlant: formData });
    navigate(`/plants/${plantData?.id}`);
  };

  return (
    <div>
      <button onClick={() => navigate(`/plants/${plantData?.id}`)}>Back</button>
      <Container>
        <Form
          handleSubmitForm={handleSubmit}
          formData={formData}
          handleChange={handleEditPlant}
        />
      </Container>
    </div>
  );
};

export default EditPlant;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
