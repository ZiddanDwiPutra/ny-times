export default class MainApi{
    static get key(){
        return "IjvxSXz5w8GWJyum8t4rBWcJAKA3R7mG";
    }

    static getMostEmailed(onSuccess) {
        return fetch(`https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=${MainApi.key}`)
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
        });
    }

    static getMostShared(onSuccess) {
        return fetch(`https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${MainApi.key}`)
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
        });
    }

    static getMostViewed(onSuccess) {
        return fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${MainApi.key}`)
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
        });
    }
}