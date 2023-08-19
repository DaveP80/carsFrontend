import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm, carmakers, origin, } from '../helper';
import { editCarInDB, newEntry } from '../api';
import ImageSearch from './ImageSearch';

function CarForm({ entry, setEntry, dataShape }) {

    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        if (entry.model === "") return;
        try {
          if (
            !validateForm.every(
              (item) => entry[item] !== "" || entry[item] !== null || entry[item] !== 'undefined'
            )
          ) {
            alert(
              "fill fields"
            );
            return;
          }
          let temp = entry;
          temp['name'] = entry.make + " " + entry.model.trim();
          delete temp.make; delete temp.model;
          if (temp.table) {
          delete temp.table;
          await newEntry(temp).then((response) => {
            navigate(`/cars/${response.data.id}`);
          });
        } else { 
        for (let n of Object.keys(entry)) {
            if (!(n in dataShape)) {
                delete temp[n];
            }
        }       
        await editCarInDB(temp, entry.id).then(res => navigate(`/cars/${res.data.id}`))
        .catch(e => console.log(e));
    }
        } catch (e) {
          console.log(e);
        }
      }

    function handleCarInput(e) {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    }

    function handleSwitch() {
        setShowMore(!showMore);
        //if (!showMore) setEntry({ ...entry, displacement: 194, acceleration: 15.6 });
    }
    return (
        <>
            {showModal && <ImageSearch entry={entry} setEntry={setEntry} setShowModal={setShowModal} />}
            <form onSubmit={handleSubmit}>
                <div className="form-check form-switch" style={{ float: 'right' }}>
                    <input className="form-check-input" type="checkbox" role="switch" checked={showMore} onChange={handleSwitch} id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Advanced Form</label>
                </div>
                <div className="mb-1">
                    <label htmlFor="make" className="form-label">Make</label>
                    <select
                        className="form-control"
                        id="make"
                        name="make"
                        value={entry.make}
                        onChange={handleCarInput}
                    >
                        {carmakers.sort().map((item, i) => {
                            return (
                                <option value={item} key={i}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-1">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input type="text" className="form-control" id="model"
                        onChange={handleCarInput}
                        value={entry.model}
                        placeholder="please fill"
                        name="model"
                    />
                    {entry.model.length > 0 && (
                        <div className="form-check form-switch" style={{ float: 'right' }}>
                            <input className="form-check-input" type="checkbox" role="switch" checked={showModal} onChange={() => setShowModal(true)} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Add Image from google</label>
                        </div>
                    )}
                </div>
                <div className="mb-1">
                    <label htmlFor="mpg" className="form-label">mpg</label>
                    <input
                        placeholder="10 - 45"
                        type="number"
                        step="0.10"
                        min="9"
                        max="47"
                        name="mpg"
                        id="mpg"
                        className="form-control"
                        onChange={handleCarInput}
                        value={entry.mpg}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="cyl" className="form-label">cylinders</label>
                    <input
                        type="number"
                        step="1"
                        min="4"
                        max="8"
                        name="cylinders"
                        id="cyl"
                        className="form-control"
                        onChange={handleCarInput}
                        value={entry.cylinders}
                    />
                </div>
                {showMore &&
                    <div className="mb-1">
                        <label htmlFor="disp" className="form-label">displacement</label>
                        <input
                            type="number"
                            step="1"
                            min="68"
                            max="455"
                            name="displacement"
                            id="disp"
                            className="form-control"
                            onChange={handleCarInput}
                            value={entry.displacement}
                        />
                    </div>
                }
                <div className="mb-1">
                    <label htmlFor="hp" className="form-label">horsepower</label>
                    <input
                        type="number"
                        step="1"
                        min="46"
                        max="280"
                        name="horsepower"
                        id="hp"
                        className="form-control"
                        onChange={handleCarInput}
                        value={entry.horsepower}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="wt" className="form-label">weight</label>
                    <input
                        type="number"
                        step="1"
                        min="1600"
                        max="5200"
                        name="weight"
                        id="wt"
                        className="form-control"
                        onChange={handleCarInput}
                        value={entry.weight}
                    />
                </div>
                {showMore &&
                    <div className="mb-1">
                        <label htmlFor="acc" className="form-label">acceleration</label>
                        <input
                            type="number"
                            step=".10"
                            min="8"
                            max="25"
                            name="acceleration"
                            id="acc"
                            className="form-control"
                            onChange={handleCarInput}
                            value={entry.acceleration}
                        />
                    </div>
                }
                <div className="mb-1">
                    <label htmlFor="m-year" className="form-label">model year</label>
                    <select
                        className="form-control"
                        id="m-year"
                        name="model_year"
                        value={entry.model_year}
                        onChange={handleCarInput}
                    >
                        {Array.from({ length: 100 - 70 + 1 }, (_, index) => 70 + index).reverse().map((item, i) => {
                            return (
                                <option value={item < 100 ? item : 20} key={i}>
                                    {item < 100 ? item : 20}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-1">
                    <label className="form-label">origin</label>
                    {origin.map((region) => (
                        <div className="form-check-inline mx-2" key={region}>
                            <input
                                type="radio"
                                className="form-check-input"
                                id={region}
                                value={region}
                                name="origin"
                                checked={entry.origin === region}
                                onChange={handleCarInput}
                            />
                            <label className="form-check-label mx-1" htmlFor={region}>{region}</label>
                        </div>
                    ))}
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary mb-2 me-2">Submit</button>
                    <button type="click" className="btn btn-outline-primary mb-2 btn-sm" onClick={() => setEntry(dataShape)}>Reset</button>
                </div>
            </form>
        </>
    )
}

export default CarForm