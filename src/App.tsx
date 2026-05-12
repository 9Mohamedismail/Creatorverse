import { Route, Routes } from "react-router-dom";
import { supabase } from "./client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import { useEffect, useState } from "react";
import type { Creator } from "./types/creator";
import "./scss/App.scss";
import NavBar from "./components/NavBar";

function App() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setCreators(data ?? []);
    }

    fetchCreators();
  }, []);

  function handleDelete(id: number) {
    setCreators((prev) => prev.filter((creator) => creator.id !== id));
  }

  function handleCreatorUpdated(updatedCreator: Creator) {
    setCreators((currentCreators) =>
      currentCreators.map((creator) =>
        creator.id === updatedCreator.id ? updatedCreator : creator,
      ),
    );
  }

  return (
    <div className="app">
      <NavBar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<ShowCreators creators={creators} />} />

          <Route
            path="/view/:id"
            element={
              <ViewCreator creators={creators} onDelete={handleDelete} />
            }
          />

          <Route
            path="/add"
            element={
              <AddCreator
                onCreatorAdded={(newCreator) => {
                  setCreators((prevCreators) => [...prevCreators, newCreator]);
                }}
              />
            }
          />

          <Route
            path="/edit/:id"
            element={
              <EditCreator
                creators={creators}
                onCreatorUpdated={handleCreatorUpdated}
                onCreatorDeleted={handleDelete}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
