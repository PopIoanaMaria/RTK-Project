import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Paths } from "./paths";
import AllPlants from "./Components/AllPlants";
import OnePlant from "./Components/OnePlant";
import AddPlant from "./Components/AddPlant";
import EditPlant from "./Components/EditPlant";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path={Paths.PLANTS} element={<AllPlants />} />
            <Route path={Paths.PLANT} element={<OnePlant />} />
            <Route path={Paths.ADD_PLANT} element={<AddPlant />} />
            <Route path={Paths.EDIT_PLANT} element={<EditPlant />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
