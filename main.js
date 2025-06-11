const website = "https://frapollif.github.io/pet-adoption-data"

function onSort(filt) {
  const allClones = document.querySelectorAll(`.clone`);
  allClones.forEach(clone =>{  
    const speciesElem = clone.querySelector('#species');
    console.log(speciesElem)
    clone.classList.remove('inv', 'vis');
    if (speciesElem.textContent.trim() == filt || filt == "All") {
      clone.classList.add('vis');
    } else {
      clone.classList.add('inv');
    }
  });

  const allButtons = document.querySelectorAll("nav button");
  allButtons.forEach(button =>{  
    if (button.dataset.filter == filt) {
      button.classList.add('buttonvis');
    } else {
      button.classList.remove('buttonvis');
    }
  });
}

async function getPetsData() {
  const data = await fetch(`${website}/pets.json`);
  const petsdata = await data.json();
  return petsdata
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
    // Creating clone
    const clone = template.content.cloneNode(true);
    clone.getElementById("template").classList.add("clone");
    clone.getElementById("template").classList.add("vis");
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
  )
}

// Starting app
const filterButtons = document.querySelectorAll("nav button");
filterButtons.forEach(button =>{
  button.addEventListener('click',(e) => onSort(button.dataset.filter))
})
displayPets()