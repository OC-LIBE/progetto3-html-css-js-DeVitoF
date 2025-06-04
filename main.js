const website = "https://frapollif.github.io/pet-adoption-data"
let restriction = "none"

function sortDog() {
  restriction = "dog"
  removePets()
  displayPets()
}
function sortCat() {
  restriction = "cat"
  removePets()
  displayPets()
}
function sortRabbit() {
  restriction = "rabbit"
  removePets()
  displayPets()
}
function dontSort() {
  restriction = "none"
  removePets()
  displayPets()
}

async function getPetsData() {
  const data = await fetch(`${website}/pets.json`);
  const petsdata = await data.json();
  return petsdata
}

function removePets() {
  let made = document.querySelectorAll(`.clone`)
  if (made.length > 0) {
    made[0].remove()
    removePets()
  }
}

function petYears(birthYear) {
  const data = new Date()
  const year = data.getFullYear()
  const ages = year- birthYear
  let text = ""
  if (ages > 1) {
    text = `${ages} years old`
  } else if (ages == 1) {
    text = `1 year old`
  } else if (ages < 1) {
    text = `Less than a year old`
  }
  return text
}

function capitalize(species) {
  return species[0].toUpperCase() + species.slice(1)
}

async function displayPets() {
  const pets = await getPetsData();
  const template = document.querySelector(`#animal-card-template`);
  const wrapper = document.querySelector('main');
  pets.forEach( pet => {
    if (pet.species == restriction || restriction == "none") {
      // Creating clone
      const clone = template.content.cloneNode(true);
      clone.getElementById("template").classList.add("clone");
      // Adapting clone
      clone.getElementById("name").textContent=`${pet.name}`;
      clone.getElementById("birthYear").textContent= petYears(pet.birthYear);
      clone.getElementById("description").textContent=`${pet.description}`;
      clone.getElementById("species").textContent= capitalize(pet.species);
      clone.getElementById("button").textContent=`Adopt ${pet.name}`;
      clone.getElementById("photo").setAttribute("src",`${pet.photo}`);
      clone.getElementById("anchor").setAttribute("href",`${website}/pets/${pet.id}/`);
      // Inserting clone
      wrapper.appendChild(clone);
    }
    }
  )
}

// Starting app
displayPets()