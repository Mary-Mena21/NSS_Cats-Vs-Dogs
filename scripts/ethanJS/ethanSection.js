import { getCatApiState, getDogApiState, getCatImageUrl, getDogImageUrl, fetchCat, fetchDog, postWinningPet } from "./ethanDataAccess.js"

const mainContainer = document.querySelector("#ethan")  

mainContainer.addEventListener("click", clickEvent => {
   const ethanImgContainer = document.querySelector("#ethan-winner")
   const winnerObj = {}
   if(clickEvent.target.id.startsWith("cat-img")) {
      const [,catId] = clickEvent.target.id.split("--")
      winnerObj.catid = catId
      winnerObj.type = "cat"
      winnerObj.vote = 1
      winnerObj.url = getCatImageUrl(catId)
      ethanImgContainer.innerHTML = `<img class="cat-img" src="${getCatImageUrl(catId)}"/>`
      postWinningPet(winnerObj)
   } else if (clickEvent.target.id.startsWith("dog-img")) {
      const [,dogId] = clickEvent.target.id.split("--")
      winnerObj.dogid = dogId
      winnerObj.type = "dog"
      winnerObj.vote = 1
      winnerObj.url = getDogImageUrl(dogId)
      ethanImgContainer.innerHTML = `<img class="cat-img" src="${getDogImageUrl(dogId)}"/>`
      postWinningPet(winnerObj)
   }
})

const catImgFunc = (cat) => {
   let html = `<input type="image" id="cat-img--${cat.id}" class="cat-img" src="${cat.url}" alt="cat image its random idk"/>`
   return html
}

const dogImgFunc = (dog) => {
   let html = `<input type="image" id="dog-img--${dog.id}" class="dog-img" src="${dog.url}" alt="dog image its random idk"/>`
   return html
}

const renderCatImg = () => {
   const catImg = getCatApiState()
   let html = catImg.map(catImgFunc)
   return html
}

const renderDogImg = () => {
   const dogImg = getDogApiState()
   let html = dogImg.map(dogImgFunc)
   return html
}

const renderAll = async () => {
   await fetchCat()
   await fetchDog()
   document.querySelector('#ethan-cat').innerHTML = renderCatImg()
   document.querySelector("#ethan-dog").innerHTML = renderDogImg()
}

renderAll()

mainContainer.addEventListener("voteRender", event => {
   renderAll()
})