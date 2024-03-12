import { useDeletePlantMutation, useGetPlantByIdQuery } from "../RTK/service";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../paths";
import styled from "styled-components";

const OnePlant = () => {
  const navigate = useNavigate();

  const { plantId } = useParams<{ plantId: string }>();

  const { data: plantData } = useGetPlantByIdQuery(plantId!);

  const [deletePlantMutation] = useDeletePlantMutation();

  const handleBack = () => {
    navigate(Paths.PLANTS);
  };

  const handleEditPlant = (plantId: string) => {
    navigate(`/plants/${plantId}/editPlant`);
  };

  const handleDeletePlant = async (plantId: string) => {
    try {
      await deletePlantMutation(plantId);
      navigate(Paths.PLANTS);
    } catch (error) {
      console.error("Failed to delete plant:", error);
    }
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <Container>
        {plantData ? (
          <ContainerPlant key={plantData.id}>
            <h3>{plantData.name}</h3>
            <h5>{plantData.species}</h5>
            <Image src={plantData.image} />
            {plantData.water && <h5>Water: {plantData.water}</h5>}
            {plantData.fertilize && <h5>Fertilize: {plantData.fertilize}</h5>}
            {plantData.description && (
              <h5>Description: {plantData.description}</h5>
            )}
            {plantData.size && <h5>Light: {plantData.size}</h5>}
            {plantData.light && <h5>Light: {plantData.light}</h5>}
            <ContainerButtons>
              <button onClick={() => handleEditPlant(plantData.id)}>
                Edit
              </button>
              <button onClick={() => handleDeletePlant(plantData.id)}>
                Delete
              </button>
            </ContainerButtons>
          </ContainerPlant>
        ) : (
          <div>No plant</div>
        )}
      </Container>
    </div>
  );
};

export default OnePlant;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const ContainerPlant = styled.div`
  border: 1px solid orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  padding: 20px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
`;

const ContainerButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;
