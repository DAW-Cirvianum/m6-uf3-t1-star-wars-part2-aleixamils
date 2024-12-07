import swapi from './swapi.js';

//Exemple d'inicialització de la llista de pel·lícules. Falten dades!
async function setMovieHeading(episodeId, titleSelector = ".movie__title", infoSelector = ".movie__info", directorSelector = ".movie__director") {
  // Obtenim els elements del DOM amb QuerySelector
  const title = document.querySelector(titleSelector);
  const info = document.querySelector(infoSelector);
  const director = document.querySelector(directorSelector);
  const charList = document.querySelector(".list.list__characters");
  if (episodeId === 0) {
    title.textContent = "Benvinguts a la Pàgina de Star Wars!";
    info.textContent = "Per començar selecciona una de les pel·lícules del selector 'Movies'.";
    director.textContent = "Autors: Pablo Ros i Aleix Amils";
    charList.replaceChildren("");
  } else {
    const movieInfo = await swapi.getMovieInfo(episodeId);
    // Injectem
    title.innerHTML = movieInfo.name;
    info.innerHTML = `Episodi ${movieInfo.episodeID} - ${movieInfo.release}`;
    director.innerHTML = movieInfo.director;
  }

}

async function initMovieSelect(selector) {
  const select = document.querySelector(selector);
  const selectW = document.querySelector('#select-homeworld');

  const movies = await swapi.listMoviesSorted();
  const defOptionM = document.createElement("option");
  defOptionM.value = "";
  defOptionM.textContent = "Selecciona una pel·lícula";
  const defOptionW = document.createElement("option");
  defOptionW.value = "";
  defOptionW.textContent = "Selecciona un homeworld";

  const options = movies.map(movie => {
    const option = document.createElement("option");
    option.value = movie.episodeID;
    option.text = movie.name;
    return option;
  })

  select.appendChild(defOptionM);
  selectW.appendChild(defOptionW);
  options.forEach(option => {
    select.appendChild(option);
  })

}

function deleteAllCharacterTokens() {}

// EVENT HANDLERS //

function addChangeEventToSelectHomeworld(selector) {
  const selectWorld = document.querySelector(selector);


  const charList = document.querySelector(".list.list__characters");

  selectWorld.addEventListener('change', async (e) => {
    try
    {
      const episodeId = document.querySelector('#select-movie').value;
      charList.replaceChildren("");
      const movieCharacterWorlds = await swapi.getMovieCharactersAndHomeworlds(episodeId);
      const filtChar = movieCharacterWorlds.characters.filter((c) => c.homeworld == selectWorld.value);
      const childs = filtChar.map((c) => {
        const li = document.createElement('li');
        li.className = "list__item item character";
        const imag = document.createElement('img');
        imag.src = "assets/user.svg";
        imag.className = 'character__image';
        const name = document.createElement('h2');
        name.className = 'character__name';
        name.innerHTML = c.name;
        const birth = document.createElement('div');
        birth.className = 'character__birth';
        birth.innerHTML = `<strong>Birth Year:</strong> ${c.birth_year}`;
        const eyes = document.createElement('div');
        eyes.className = 'character__eye';
        eyes.innerHTML = `<strong>Eye color:</strong> ${c.eye_color}`;
        const gender = document.createElement('div');
        gender.className = 'character__gender';
        gender.innerHTML = `<strong>Gender:</strong> ${c.gender}`;
        const home = document.createElement('div');
        home.className = 'character__home';
        home.innerHTML = `<strong>Home World:</strong> ${c.homeworld}`;

        li.appendChild(imag);
        li.appendChild(name);
        li.appendChild(birth);
        li.appendChild(eyes);
        li.appendChild(gender);
        li.appendChild(home);
        return li;
      });

      childs.forEach((child) => charList.appendChild(child));
    }
    catch (error) {
      console.error(error)
    }
  })
}

async function _createCharacterTokens() {}

function _addDivChild(parent, className, html) {}

async function setMovieSelectCallbacks(selector) {
  const selectMovie = document.querySelector(selector);
  const selectWorld = document.querySelector('#select-homeworld');
  if (!selectMovie) {
    console.error(`No s'ha trobat l'element: ${selector}`);
    return;
  }
  selectMovie.addEventListener('change', async (e) => {
    try {
      const episodeId = selectMovie.value;
      await setMovieHeading(episodeId);
      selectWorld.replaceChildren("");

      const defOption = document.createElement('option');
      defOption.value = "";
      defOption.innerText = "Selecciona un homeworld";
      selectWorld.appendChild(defOption);
      const movieCharacterWorlds = await swapi.getMovieCharactersAndHomeworlds(episodeId);
      const worlds = movieCharacterWorlds.characters.reduce((acc, char) => {
        if (!acc.includes(char.homeworld)){
          acc.push(char.homeworld);
        }
        return acc;
      }, []).sort((a, b) => ('' + a).localeCompare(b));

      const worldOptions = worlds.map((op) => {
        const option = document.createElement('option');
        option.value = op;
        option.textContent = op;
        return option;
      })

      worldOptions.forEach((o) => selectWorld.appendChild(o));
    } catch (error) {
      console.error('Error en modificar el header: ', error);
    }
  });
}

async function _handleOnSelectMovieChanged(event) {}

function _filmIdToEpisodeId(episodeID) {}

// "https://swapi.dev/api/films/1/" --> Episode_id = 4 (A New Hope)
// "https://swapi.dev/api/films/2/" --> Episode_id = 5 (The Empire Strikes Back)
// "https://swapi.dev/api/films/3/" --> Episode_id = 6 (Return of the Jedi)
// "https://swapi.dev/api/films/4/" --> Episode_id = 1 (The Phantom Menace)
// "https://swapi.dev/api/films/5/" --> Episode_id = 2 (Attack of the Clones)
// "https://swapi.dev/api/films/6/" --> Episode_id = 3 (Revenge of the Sith)

let episodeToMovieIDs = [
  { m: 1, e: 4 },
  { m: 2, e: 5 },
  { m: 3, e: 6 },
  { m: 4, e: 1 },
  { m: 5, e: 2 },
  { m: 6, e: 3 },
];

function _setMovieHeading({ name, episodeID, release, director }) {}

function _populateHomeWorldSelector(homeworlds) {}

/**
 * Funció auxiliar que podem reutilitzar: eliminar duplicats i ordenar alfabèticament un array.
 */
function _removeDuplicatesAndSort(elements) {
  // Al crear un Set eliminem els duplicats
  const set = new Set(elements);
  // tornem a convertir el Set en un array
  const array = Array.from(set);
  // i ordenem alfabèticament
  return array.sort(swapi._compareByName);
}

const act7 = {
  setMovieHeading,
  setMovieSelectCallbacks,
  initMovieSelect,
  deleteAllCharacterTokens,
  addChangeEventToSelectHomeworld,
};

export default act7;
