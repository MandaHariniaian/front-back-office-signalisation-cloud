import http from "../http-common";

class TypeSignalisation {

    selectAll(id) {
        return http.get("/api/type_signalisation");
    }

    update(id, data) {
        return http.put("/api/type_signalisation/" + id, data);
    }

    insert(data) {
        return http.post("/api/type_signalisation", data);
    }

    delete(id) {
        return http.delete("/api/type_signalisation/" + id);
    }

}


export default new TypeSignalisation();