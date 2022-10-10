import { useState, useEffect } from "react";
import SelectVariants from "./Interview";

import star from './assest/starwars.webp'




function App() {

  const [datas, setData] = useState([])
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setSpinner(true);

      let data;
      data = await fetch('https://swapi.dev/api/films/')

      const dataJson = await data.json();
      setData(dataJson.results);

      setSpinner(false);
    }

    getData()

  }, [setData])




  return (
    <div className="App">
      <img src={star} alt='' />
      <h3>Select a Star Wars Movie</h3>
      {spinner && (
        <div class="">Loading...</div>
      )}
      <SelectVariants datas={datas} />
    </div>
  );
}

export default App;
