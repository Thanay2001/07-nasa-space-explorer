const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const button = document.querySelector('button');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const factBox = document.getElementById('randomFact');

const spaceFacts = [
  "The Sun accounts for about 99.86% of the mass in the solar system.",
  "One day on Venus is longer than a year on Venus.",
  "There are more trees on Earth than stars in the Milky Way.",
  "Mars has the tallest volcano in the solar system: Olympus Mons."
];
factBox.textContent = `Did You Know? ${spaceFacts[Math.floor(Math.random() * spaceFacts.length)]}`;

document.querySelector("button").addEventListener("click", () => {
  const startDate = startInput.value;
  const endDate = endInput.value;
  fetchImages(startDate, endDate);
});

async function fetchImages(startDate, endDate) {
  gallery.innerHTML = "<p>Loading images...</p>";
  try {
    const apiKey = "DEMO_KEY";
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`);
    const data = await res.json();

    gallery.innerHTML = "";
    data.reverse().forEach(item => {
      if (item.media_type === "image") {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
          <img src="${item.url}" alt="${item.title}" />
          <p><strong>${item.title}</strong><br>${item.date}</p>
        `;
        div.addEventListener("click", () => showModal(item));
        gallery.appendChild(div);
      }
    });

    if (gallery.innerHTML === "") {
      gallery.innerHTML = "<p>No images found in this range.</p>";
    }

  } catch (error) {
    console.error(error);
    gallery.innerHTML = "<p>Failed to load images.</p>";
  }
}

function showModal(item) {
  modalContent.innerHTML = `
    <h2>${item.title}</h2>
    <img src="${item.url}" alt="${item.title}" />
    <p>${item.explanation}</p>
    <p><em>${item.date}</em></p>
  `;
  modal.style.display = "flex";
}

modal.addEventListener("click", () => {
  modal.style.display = "none";
});
