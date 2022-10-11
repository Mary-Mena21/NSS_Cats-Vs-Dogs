import {
  getRandomCat,
  getRandomDog,
  recordVote,
  getWinners,
} from "./ganeshSectionDataAccess.js";

const ganeshSection = document.querySelector("#ganesh__section");
const sidebar = document.querySelector("#sidebar");

const renderGaneshSectionHtml = async () => {
  const randomCat = await getRandomCat();
  const randomDog = await getRandomDog();

  //   console.log(randomCat[0].url);
  //   console.log(randomDog[0].url);

  const ganeshSectionHtml = ` 
        <div id="ganesh__section__parent__container" class="ganesh__section__parent__container">       
        <div class="ganesh__section__header">
          <h3 class="teamName">Ganesh's Section</h3>
        </div>
        <div id="ganesh" class="ganesh__section__image__parent">
          <div class="ganesh__section__image_container">
            <img
                id="ganesh__section__image__clicked__cat__${randomCat[0].url}"
                class="ganesh__section__image"
                title="Click to Vote"
                src=${randomCat[0].url} 
                alt="image of a random cat" 
            />
          </div>
          <div class="ganesh__section__image_container">
            <img
                id="ganesh__section__image__clicked__dog__${randomDog[0].url}"
                class="ganesh__section__image"
                title="Click to Vote"
                src=${randomDog[0].url} 
                alt="image of a random dog" 
            />
          </div>
        </div>
        </div>
        `;

  ganeshSection.innerHTML = ganeshSectionHtml;
};

renderGaneshSectionHtml();

const renderSidebar = async () => {
  const winners = await getWinners();
  console.log(winners);
  const sidebarHtml = ``;
  sidebar.innerHTML = sidebarHtml;
};

renderSidebar();

ganeshSection.addEventListener("click", async (imageClicked) => {
  if (imageClicked.target.id.startsWith("ganesh__section__image__clicked__")) {
    const clickedId = imageClicked.target.id.split("__");
    const url = clickedId.pop();
    const type = clickedId.pop();

    await recordVote({ url: url, type: type, vote: 1 });
  }
});

ganeshSection.addEventListener("voteRecorded", (customEvent) => {
  console.log("vote recorded");
  renderGaneshSectionHtml();
});