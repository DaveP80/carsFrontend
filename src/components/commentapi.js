import axios from "axios";
const API = process.env.REACT_APP_API_URL2;

export async function makeComment(obj) {
    try {
        const comm = axios.post(API, obj);
        return comm
    } catch (e) {
        console.log(e);
    }
}
export async function deleteComment(id) {
    try {
        const dcomm = axios.delete(`${API}/${id}`);
        return dcomm
    } catch (e) {
        console.log(e);
    }
}