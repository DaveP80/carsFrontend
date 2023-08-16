import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const API3 = process.env.REACT_APP_API_URL3;

export async function fetchCarData() {
  try {
    const result = await axios.get(`${API}/cars`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchIndexData() {
  try {
    const result = await axios.get(`${API}/cars/limit/100`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchIndexDataDesc() {
  try {
    const result = await axios.get(`${API}/cars/limit/desc/20`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCarById(id) {
  try {
    const result = await axios.get(`${API}/cars/card/${id}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteCarById(id) {
  try {
    const result = await axios.delete(`${API}/cars/${id}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCarByName(name) {
  try {
    const result = await axios.get(`${API}/cars`, {
      params: { q: name },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPopularCars() {
  try {
    const result = await axios.get(API3);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchBySubstring(query) { 
  try {
    const result = await axios.get(`${API}/cars/search`, {
      params: { q: query },
    });
    return result;
  } catch (e) {
    console.log({ message: 'no results',
                      err: e });
  }
}

export async function newEntry(entry) {
  try {
    const result = await axios.post(`${API}/cars`, entry);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function editCarInDB(body, id) {
  try {
    const result = await axios.put(`${API}/cars/${id}`, body);
    return result;
  } catch (e) {
    console.log(e);
  }
}
