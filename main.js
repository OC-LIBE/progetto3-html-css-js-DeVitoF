const website = "https://frapollif.github.io/pet-adoption-data"
let restriction = "none"

function sortPets(restric) {
  restriction = restric
}

async function getPetsData() {
  const data = await fetch(`${website}/pets.json`);
  const petsdata = await data.json();
  console.log(petsdata)
  return petsdata
  
}

async function displayPets() {
  const pets = await getPetsData();
  const template = document.querySelector(`#animal-card-template`);
  const wrapper = document.querySelector('main');
  console.log(template)
  pets.forEach( pet => {
    if (pet.species == restriction || restriction == "none") {
      // Creating clone
      const clone = template.content.cloneNode(true);
      // Adapting clone
      clone.getElementById("name").textContent=`${pet.name}`;
      clone.getElementById("birthYear").textContent=`${pet.birthYear}`;
      clone.getElementById("description").textContent=`${pet.description}`;
      clone.getElementById("species").textContent=`${pet.species}`;
      clone.getElementById("button").textContent=`Adopt ${pet.name}`;
      clone.getElementById("photo").setAttribute("src",`${pet.photo}`);
      clone.getElementById("anchor").setAttribute("href",`${website}/pets/${pet.id}/`);
      // Inserting clone
      wrapper.appendChild(clone)
    }
    }
  )
}

// Starting app
displayPets()