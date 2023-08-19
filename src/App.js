import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import { CarContext, FormContext } from "./components/Context/context";
import CreateCar from "./components/CreateCar/CreateCar";
import Spinner from "./common/Spinner";
import { fetchPopularCars } from "./components/api";
import "./App.css";

function App() {
  const AllCars = React.lazy(() => import("./components/AllCars/AllCars"));
  const ShowCar = React.lazy(() => import("./components/ShowCar/ShowCar"));
  const Index = React.lazy(() => import("./components/DBIndex/Index"));
  const SearchRes = React.lazy(() =>
    import("./components/SearchRes/SearchRes")
  );

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const carContextValue = {
    isLoading,
    setIsLoading,
    data,
    popularCars,
  };

  function popularCars() {
    fetchPopularCars().then(res => { setData(res.data); localStorage.setItem("popcars", JSON.stringify(res.data)); })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    popularCars()
  }, [])

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
              <Route path="/search" element={<SearchRes />} />
              <Route path="/create" element={<CreateCar />} />
              <Route path="/index" element={<Index />} />
              <Route path="/404" element={<h1>404 Error Not Found</h1>} />
              <Route path="*" element={<h1>404 Error Not Found</h1>} />
            </Routes>
          </Router>
        </CarContext.Provider>
      </React.Suspense>
    </div>
  );
}

export default App;
