import { useEffect, useState } from "react";

export default function PickleList() {
  const[pickles, setPickles] = useState<{id: string, name: string}[]>([]);
  async function handleFetch() {
    const response = await fetch("/api/pickles");
    const result = await response.json();
    setPickles(result);
  }
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div>
       {pickles.map((pickle) => (
        <div key={pickle.id}>
          <h2>{pickle.name}</h2>
          </div>
      ))}
    </div>
  );
}
