let croccantini = 80000;

document.getElementById('cambiaColore').addEventListener('click', cambiaSfondo);

function cambiaSfondo() {
  document.body.style.backgroundColor = getRandomColor();
  moreCroccantini();
}

function getRandomColor() {
  const lettere = '0123456789ABCDEF';
  let colore = '#';
  for (let i = 0; i < 6; i++) {
    colore += lettere[Math.floor(Math.random() * 16)];
  }
  return colore;
}

function moreCroccantini() {
    croccantini += 1;
}