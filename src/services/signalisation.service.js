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

    statParRegion(){
        return http.get("/api/signalisations/stat-region");
    }

    statParType(){
        return http.get("/api/signalisations/stat-type");
    }

    getImageSignalisation(idSignalisation){
        return http.get("/api/imageSignalisations/getImage/" + idSignalisation);

    }
}


export default new SignalisationService();