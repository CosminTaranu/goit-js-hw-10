import axios from "axios"
import Notiflix from 'notiflix';

const API_KEY = 'live_0CBIkJKygF3J82BcXLhpQ01Ls6JFqkOXaYAhRLX3t2iCQM3knVM66au2hA0dtpmw';
axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
    return fetch (`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`).then(Response => {
        if(!Response.ok) {
            throw new Error(Response.status)
        }
        return Response.json()
    })
     .catch(Error => {
        console.error (error);
        Notiflix.Notify.failure('Try reloading the page!')
        
     })
}

export function fetchCatByBreed(breedId) {
    return fetch (`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`). then(response =>{
        if(!response.ok) {
            throw new Error(response.status)
        }
        return response.json()
    })
    .catch(error =>{
        console.error(error);
        Notiflix.Notify.failure('Try reloading the page!')
    })
}
     
