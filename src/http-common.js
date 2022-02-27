import axios from "axios";

export default axios.create({
    //baseURL: "http://localhost:9090",
    baseURL: "https://rest-api-signalisation-cloud.herokuapp.com",
    headers: {
        "Content-type": "application/json" 
    }
})