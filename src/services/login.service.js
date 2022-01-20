import http from "../http-common";

class LoginService{
    verifierLogin(data){
        return http.post("/api/back-office/verifierLogin", data);
    }
    
    verifierCookie(data){
        return http.post("/api/back-office/verifierCookie", data);
    }

    deleteCookie(data){
        return http.delete("/api/back-office/delete/"+data);
    }
}


export default new LoginService();