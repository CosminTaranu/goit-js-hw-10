import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

    const breedSelect = document.querySelector('.breed-select');
    const catInfoDiv = document.querySelector('.cat-info');
    const loader = document.querySelector('p.loader');
    const errorElement = document.querySelector('p.error');

    function showLoader() {
        loader.classList.add('visible');
        loader.classList.remove('hidden');
    }

    function hideLoader() {
        loader.classList.add('hidden');
        loader.classList.remove('visible');
    }

    function showElement(element) {
        element.classList.add('visible');
        element.classList.remove('hidden');
    }

    function hideElement(element) {
        element.classList.add('hidden');
        element.classList.remove('visible');
    }

    function showError(message) {
        errorElement.textContent = message;
        showElement(errorElement);
    }

    function hideError() {
        hideElement(errorElement);
    }


    hideElement(breedSelect); 
    showLoader(); 

    fetchBreeds()
        .then(breeds => {
            if (breeds && Array.isArray(breeds)) {
                breeds.forEach(breed => {
                    const option = document.createElement('option');
                    option.value = breed.id;
                    option.textContent = breed.name;
                    breedSelect.appendChild(option);
                });
                showElement(breedSelect); 
            } else {
                console.error(error);
                showError("Eroare la încărcarea listelor de rase.");
            }
        })
        .catch(error => {
            console.error("Fetch-ul nu a functionat", error);
            showError("Eroare la încărcarea listelor de rase.");
        })
        .finally(() => {
            hideLoader(); 
        });

    
    breedSelect.addEventListener('change', () => {
        hideError(); 
        const selectedBreedId = breedSelect.value;
        if (selectedBreedId) {
            hideElement(catInfoDiv); 
            showLoader(); 

            fetchCatByBreed(selectedBreedId)
                .then(cats => {
                    if (cats && cats.length > 0) {
                        const cat = cats[0];
                        const breed = cat.breeds?.[0];
                        if (breed) {
                    
                            catInfoDiv.innerHTML = `
                                <h2>${breed.name}</h2>
                                <p>${breed.description}</p>
                                <p>Temperament: ${breed.temperament}</p>
                                <img src="${cat.url}" alt="${breed.name}"/>`;
                        } else {
                            catInfoDiv.innerHTML = '<p>Nicio informatie despre aceasta rasa de pisica!</p>';
                        }
                        showElement(catInfoDiv); 
                    } else {
                        catInfoDiv.innerHTML = '<p>Nicio informatie despre aceasta rasa de pisica!</p>';
                    }
            
                })
                .catch(error => {
                    console.error("Fetch-ul nu a functionat", error);
                    showError("Eroare la încărcarea informațiilor despre pisică.");
                })
                .finally(() => {
                    hideLoader(); 
                });
                console.dir(fetchCatByBreed)
        }
    });
