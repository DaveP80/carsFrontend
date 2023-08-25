import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import { CarContext } from "./components/Context/context";
import CreateCar from "./components/CreateCar/CreateCar";
import Spinner from "./common/Spinner";
import { carImage } from "./components/helper";
import Error from "./components/Error/Error";

function App() {
  const AllCars = React.lazy(() => import("./components/AllCars/AllCars"));
  const ShowCar = React.lazy(() => import("./components/ShowCar/ShowCar"));
  const Index = React.lazy(() => import("./components/DBIndex/Index"));

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchArr, setSearchArr] = useState([]);

  const carContextValue = {
    isLoading,
    setIsLoading,
    carImage,
    search,
    setSearch,
    searchArr,
    setSearchArr,
  };

  return (
    <div className="App">
      <React.Suspense fallback={<Spinner />}>
        <CarContext.Provider value={carContextValue}>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<AllCars />} />
              <Route path="/cars/:id" element={<ShowCar />} />
              <Route path="/create" element={<CreateCar />} />
              <Route path="/index" element={<Index />} />
              <Route path="/404" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </CarContext.Provider>
      </React.Suspense>
    </div>
  );
}

export default App;
