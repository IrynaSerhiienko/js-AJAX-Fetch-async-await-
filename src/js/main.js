// Картка персонажу https://rickandmortyapi.com/api/character?page=1
// Серії https://rickandmortyapi.com/api/episode/2
// https://rickandmortyapi.com/api/character/826`
(async function () {
  const api = "https://rickandmortyapi.com/api/character?page=1";

  //   const out = document.querySelector(".movie__container");
  const out = document.querySelector(".user-cards");
  const selectCategory = document.querySelector("#select-category");
  const searchInput = document.querySelector("[data-search]");
  const previousPage = document.querySelector(".previous");
  const currentPage = document.querySelector(".current");
  const nextPage = document.querySelector(".next");
  //   const input = document.querySelector("#search");

  getCharacters(api);

  async function getCharacters(url) {
    try {
      const response = await fetch(url);
      const respData = await response.json();
      console.log(respData);
      renderCharacters(respData);
      //   renderCharacters(respData.results);
    } catch (error) {
      console.log(error);
    }
  }

  function renderCharacters(characters) {
    const select = [];
    out.innerHTML = "";

    // characters.forEach((item) => {
    characters.results.forEach((item) => {
      let newCharacter = createItem(item);
      out.append(newCharacter);
      select.push(item.species);
    });

    let select2 = new Set(select); //delete repeated values from select

    select2.forEach((item) => {
      selectCategory.innerHTML += `
             <option value="${item}">${item}</option>
            `;
    });

    selectCategory.addEventListener("change", () => {
      if (selectCategory.value != "all") {
        out.innerHTML = "";
        let arr = characters.results.filter(
          // let arr = characters.filter(
          (item) => item.species === selectCategory.value
        );
        arr.map((item) => {
          let newCharacter = createItem(item);
          out.append(newCharacter);
        });
      } else {
        out.innerHTML = "";
        // characters.map((item) => {
        characters.results.map((item) => {
          let newCharacter = createItem(item);
          out.append(newCharacter);
        });
      }
    });

    previousPage.addEventListener("click", (e) => {
    //   selectCategory.innerHTML = "";
      out.innerHTML = "";
      getCharacters(characters.info.prev);
    });

    nextPage.addEventListener("click", (e) => {
    //   selectCategory.innerHTML = "";
      out.innerHTML = "";
      getCharacters(characters.info.next);
    });

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      out.innerHTML = "";
      if (value != "all") {
        // let arr = characters.filter((item) =>
        let arr = characters.results.filter((item) =>
          item.name.toLowerCase().includes(value)
        );
        arr.map((item) => {
          let newCharacter = createItem(item);
          out.append(newCharacter);
        });
      } else {
        out.innerHTML = "";
        // characters.map((item) => {
        characters.results.map((item) => {
          let newCharacter = createItem(item);
          out.append(newCharacter);
        });
      }
    });
  }

  function createItem(character) {
    let item = document.createElement("div");
    let name = document.createElement("h2");
    let img = document.createElement("img");
    let gen = document.createElement("div");
    let alive = document.createElement("div");
    let species = document.createElement("div");
    let data = document.createElement("div");

    // item.classList.add("movie__item");
    item.classList.add("card");
    name.classList.add("movie__name");
    img.classList.add("movie__img");
    gen.classList.add("movie__gen");
    alive.classList.add("movie__alive");
    species.classList.add("movie__species");
    data.classList.add("movie__data");

    name.innerHTML = character.name;
    gen.innerHTML = `Стать: <b> ${character.gender} </b>`;
    // якщо мертвий закрашувати в сірий
    alive.innerHTML = `Стан здоровя: <b> ${character.status} </b>`;
    species.innerHTML = `Вид: <b> ${character.species} </b>`;
    data.innerHTML = `Дата народження: <i> ${character.created} </i>`;
    img.src = character.image;

    item.append(name, img, gen, alive, species, data);

    return item;
  }
})();
