import http from "../http-common";

class imageSIgnalisationService{

    getImage(idSignalisation){
        return http.get("api/imageSignalisations/getImage/"+idSignalisation);
    }
}


export default new imageSIgnalisationService();