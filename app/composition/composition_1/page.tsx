"use client";
import Composer_1 from "@/models/composition/Composer_1";
import Composition1_List from "@/views/composition/composition_1/Composition1_List";
import { useState, useEffect } from "react";

function Composition1() {
  const [composer_1, setComposer_1] = useState<Array<Composer_1>>([]);
  const fetchComposer_1 = async () => {
    try {
      const response = await fetch("/api/composition/composition1");
      const data = await response.json();
      setComposer_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComposer_1();
  }, []);

  const handleDelete = async (id_composer_1: string) => {
    try {
      const response = await fetch(
        `/api/composition/composition1/delete/${id_composer_1}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Suppression avec succès");
        fetchComposer_1();
      } else {
        alert("Echec de la suppression de composer_1");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Composition1_List composer_1={composer_1} handleDelete={handleDelete} />
  );
}

export default Composition1;
