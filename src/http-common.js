import axios from "axios";

export default axios.create({
    baseURL: "https://rest-api-signalisation-cloud.herokuapp.com",
    headers: {
        "Content-type": "application/json" 
    }
})