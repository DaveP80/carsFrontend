import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const API3 = process.env.REACT_APP_API_URL3;
const API4 = process.env.REACT_APP_API_URL4;
const API5 = process.env.REACT_APP_API_URL5;
const ID = process.env.REACT_APP_API_CSEID;
const KEY = process.env.REACT_APP_API_CSEKEY;

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
    const result = await axios.get(`${API}/cars/limit/50`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getSearchSugg() {
  try {
    const result = await axios.get(API4);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchIndexDataDesc() {
  try {
    const result = await axios.get(`${API}/cars/limit/desc/50`);
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
    console.log({
      message: "no results",
      err: e,
    });
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
//increment count column in popularity table
export async function updateCarPopularity(id) {
  try {
    const result = await axios.put(`${API3}/${id}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCarImage(data) {
  try {
    const result = await axios.get(
      `https://www.googleapis.com/customsearch/v1?q=${data}&cx=${ID}&searchType=image&num=5&key=${KEY}`
    );
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchIndexedPage(num) {
  try {
    const result = await axios.get(`${API5}`, {
      params: {
        off: num,
        lim: 50,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
