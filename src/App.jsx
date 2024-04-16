
import { BrowserRouter , Route, Routes } from "react-router-dom";
import WeatherApp from "./components/WeatherApp/WeatherApp";


const App = () => {
  return (
   <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<WeatherApp/>} /> 
        </Routes>
    </BrowserRouter>
  );
};

export default App;
