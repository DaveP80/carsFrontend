import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../common/Overlay";
import { CarContext } from "../Context/context";
import { fetchIndexData, fetchIndexDataDesc } from "../api";
import { updown } from "../../assets";

function Index() {
  const { isLoading, setIsLoading } = useContext(CarContext);
  const [cars, setCars] = useState(null);
  const [order, setOrder] = useState(false);
  const [noresult, setnoResult] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (order) {
      fetchIndexDataDesc()
        .then((res) => {
          setIsLoading(false);
          setCars(res.data);
        })
        .catch((e) => setnoResult(true));
    } else {
      fetchIndexData()
        .then((res) => {
          setIsLoading(false);
          setCars(res.data);
        })
        .catch((e) => setnoResult(true));
    }
  }, [order]);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container pt-2">
        {cars && (
          <>
            <h3 className="text-warning text-center">Classic Car DB</h3>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      ID
                      <img
                        src={updown}
                        style={{ width: "25px", height: "33px", cursor: 'pointer' }}
                        alt="updown"
                        onClick={() => setOrder(!order)}
                      />
                    </th>
                    <th>make model</th>
                    <th>mpg</th>
                    <th>cylinders</th>
                    <th>horsepower</th>
                    <th>weight</th>
                    <th>model year</th>
                    <th>origin</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.mpg}</td>
                      <td>{item.cylinders}</td>
                      <td>{item.horsepower}</td>
                      <td>{item.weight}</td>
                      <td>{item.model_year}</td>
                      <td>{item.origin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) }
        { noresult && <div className="alert alert-primary" role="alert">
            Unable to load info
          </div>
        }
      </div>
    </Overlay>
  );
}

export default Index;
