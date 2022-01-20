import http from "../http-common";

class RegionService {
    select(id) {
        return http.get("/api/regions/" + id);
    }

    selectAll(id) {
        return http.get("/api/regions");
    }

    update(id, data) {
        return http.put("/api/regions/" + id, data);
    }

    insert(data) {
        return http.post("/api/regions", data);
    }

    delete(id) {
        return http.delete("/api/regions/" + id);
    }

}


export default new RegionService();