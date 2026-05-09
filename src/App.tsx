import { Route, Routes } from "react-router-dom";
import { supabase } from "./client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import { useEffect, useState } from "react";
import type { Creator } from "./types/creator";

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

  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowCreators creators={creators} />} />
        <Route path="/view/:id" element={<ViewCreator creators={creators} />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/edit" element={<EditCreator />} />
      </Routes>
    </div>
  );
}

export default App;
