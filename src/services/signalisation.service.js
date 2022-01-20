import http from "../http-common";

class SignalisationService{
    select(id){
        return http.get("/api/signalisations/"+id);
    }

    selectAll(){
        return http.get("/api/signalisations_non_affecte");
    }

    update(id, data){
        return http.put("/api/signalisations/"+id, data);
    }

    statGlobale(){
        return http.get("/api/signalisations/stat-glob");
    }
}


export default new SignalisationService();