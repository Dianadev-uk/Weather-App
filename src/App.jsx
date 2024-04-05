
import { BrowserRouter , Route, Routes } from "react-router-dom";
import WeatherApp from "./components/WeatherApp/WeatherApp";
import FiveDays from "./components/FiveDays/FiveDays";



const App = () => {
  return (
   <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<WeatherApp/>} />
          <Route path="/forecast" element={<FiveDays />} />   
        </Routes>
    </BrowserRouter>
  );
};

export default App;
