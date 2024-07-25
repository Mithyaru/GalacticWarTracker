import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/campanha/Card";

function App() {
  const [campanhas, setCampanhas] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [snapshot, setSnapshot] = useState([]);
  const [cue, setCue] = useState(false);

  const planetsCall = async () => {
    try {
      const response = await axios.get("http://localhost:4000/planets");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      return null;
    }
  };

  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:4000/campanhas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall()
      console.log('data foi')
      if (data) {
        console.log('condição verdadeira')
        setCampanhas(data);
        setCue(true);
      }
      
    }
    fetchData()
  }, [])


  const click = async () => {
    const dataPlanets = await planetsCall();
    if (dataPlanets) {
      setPlanets(dataPlanets);
    }
    console.log(planetsCall);
    const data = await apiCall();
    if (data) {
      setCampanhas(data);
      setCue(true);
    }
  };

  useEffect(() => {
    if (cue) {
      const interval = setInterval(async () => {
        setSnapshot(campanhas);
        const newData = await apiCall();
        setCampanhas(newData);
      }, 300000);

      return () => clearInterval(interval);
    }
  }, [cue, campanhas]);

  console.log(campanhas, snapshot);
 

  return (
    <div className="App">
      <div className="page">
        {campanhas.length !== 0 ? (
          <Card campanhas={campanhas} snapshot={snapshot}></Card>
        ) : (
          <></>
        )}

        <div className="orders"></div>
      </div>
      <button onClick={click}>aaaaaa</button>
    </div>
  );
}

export default App;
