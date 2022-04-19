import Wrapper from "../src/wrapper"

export default class MainApi{
    static get key(){
        return "IjvxSXz5w8GWJyum8t4rBWcJAKA3R7mG";
    }

    static getData(url, onSuccess){
        Wrapper.showLoading()
        return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            Wrapper.hideLoading()
            onSuccess(data);
        });
    }

    static getMostEmailed(onSuccess) {
        return MainApi.getData(`https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${MainApi.key}`, onSuccess)
    }

    static getMostShared(onSuccess) {
        return MainApi.getData(`https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${MainApi.key}`, onSuccess)
    }

    static getMostViewed(onSuccess) {
        return MainApi.getData(`https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=${MainApi.key}`, onSuccess)
    }
}