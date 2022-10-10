import { useState, useEffect } from "react";
import SelectVariants from "./Interview";






function App() {

  const [datas, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      let data;

      data = await fetch('https://swapi.dev/api/films/') 
        .then(data => data.json())
      return data
    }

    getData().then(data => setData(data.results))
    /*.then(console.log(datas))*/

  }, [datas])




  return (
    <div className="App">
      <SelectVariants datas={datas} />
    </div>
  );
}

export default App;
