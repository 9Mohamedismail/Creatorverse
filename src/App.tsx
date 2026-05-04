import { Route, Routes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreators from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/view" element={<ViewCreators />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/edit" element={<EditCreator />} />
      </Routes>
    </div>
  );
}

export default App;
