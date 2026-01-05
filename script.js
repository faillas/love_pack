const defaultPhrases = [
  "Fai un bagno",
  "Gioca a un gioco sul telefono",
  "Bevi un succo di frutta",
  "Ascolta musica",
  "Respira profondamente per 1 minuto",
  "Fai un pisolino",
  "Leggi un libro",
  "Pulisci casa",
  "Scrivi qualcosa su come ti senti e cosa vorresti fare",
  "Cucina qualcosa",
  "Ordina il tuo guardaroba",
  "Fai una passeggiata",
  "Pratica degli esercizi di rilassamento",
  "Fai un progetto fai da te"
];

let phrases = [...defaultPhrases];
let alreadyOpened = false;

const image = document.getElementById("packImage");
const phraseEl = document.getElementById("phrase");
const toast = document.getElementById("toast");
const infoDialog = document.getElementById("infoDialog");
const infoBtn = document.getElementById("infoBtn");
const fileInput = document.querySelector("input[type=file]");

/* Click immagine */
image.addEventListener("click", () => {
  if (alreadyOpened) {
    showToast("Ricarica la pagina per scoprire una nuova attività");
    return;
  }

  alreadyOpened = true;
  image.src = "assets/opened.png";
  image.classList.add("opened");

  const random = phrases[Math.floor(Math.random() * phrases.length)];
  phraseEl.textContent = random;
  phraseEl.classList.remove("hidden");
});

/* CSV upload */
const uploadBtn = document.querySelector(".csv-upload");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    phrases = reader.result
      .split("\n")
      .map(r => r.trim())
      .filter(r => r.length > 0);

    uploadBtn.classList.add("loaded");
    uploadBtn.querySelector(".text").textContent = "CSV caricato";
    showToast("Frasi personalizzate caricate 💖");
  };
  reader.readAsText(file);
});

/* Info dialog */
infoBtn.addEventListener("click", () => {
  infoDialog.showModal();
});

/* Toast */
function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2500);
}