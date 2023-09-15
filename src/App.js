
import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar';
import TextBox from './Components/TextBox';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Action from './Components/Action';
import CardBox from './Components/CardBox';
import Slider from './Components/Slider';



function App() {

  const [mode, setDataToMode] = useState();


  const handleModeData = (data) => {
    setDataToMode(data);

  };

  useEffect(() => {
    fetchData();
  }, []);


  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    const url = 'https://dog-breeds2.p.rapidapi.com/dog_breeds';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_SANKET,
        'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFetchedData(result);


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>



      <BrowserRouter>


        <Navbar sendDataToParent={handleModeData} title="Fussion" />


        <Routes>
          <Route exact path="/" element={<TextBox modelevel={mode} />} />
          <Route exact path="/code" element={<Action modelevel={mode} />} />
          <Route exact path="/dogs" element={<CardBox modelevel={mode} dataget={fetchedData} />} />
          <Route exact path="/slider" element={<Slider />} />


        </Routes>

      </BrowserRouter >
    </>

  );
}

export default App;
