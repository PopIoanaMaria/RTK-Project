import styled from "styled-components";
import { useGetAllPlantsQuery } from "../RTK/service";
import { Plant } from "../interfaces";
import { useNavigate } from "react-router-dom";

function AllPlants() {
  const navigate = useNavigate();

  const { data: allPlantsData } = useGetAllPlantsQuery();

  const handleClick = (plantId: string) => {
    navigate(`/plants/${plantId}`);
  };

  const handleAddPlant = () => {
    navigate("/plants/addPlant");
  };

  return (
    <div>
      <h2>All Plants</h2>
      <ContainerButton>
        <button onClick={handleAddPlant}>Add plant</button>
      </ContainerButton>
      {allPlantsData && (
        <Container>
          {allPlantsData.map((plant: Plant) => (
            <ContainerPlant key={plant.id}>
              <Details onClick={() => handleClick(plant.id)}>
                <h3>{plant.name}</h3>
                <Image src={plant.image} />
              </Details>
            </ContainerPlant>
          ))}
        </Container>
      )}
    </div>
  );
}

export default AllPlants;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const ContainerButton = styled.div`
  display: flex;
  margin: 20px 0;
`;

const ContainerPlant = styled.div`
  border: 1px solid orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 250px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
