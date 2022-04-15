export default class MainApi{
    static get key(){
        return "IjvxSXz5w8GWJyum8t4rBWcJAKA3R7mG";
    }

    static getMostViewed(onSuccess) {
        return fetch(`https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=${MainApi.key}`)
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
        });
    }
}