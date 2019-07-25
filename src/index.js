const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyContainer = document.querySelector('#toy-collection')

let addToy = false
document.addEventListener("click", handleClickEvents)
let form = document.querySelector(".add-toy-form")
form.addEventListener('submit', handleToyFormSubmit)

//Event listener to check if the Toy has been added ?
addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//DOM Loaded
document.addEventListener("DOMContentLoaded", setUpPage)
function setUpPage(){ 
  let form = document.querySelector("#book-form")
  // form.addEventListener("submit")//,handleSubmit)
  getAllToys()
}

  function getAllToys(){
    fetch('http://localhost:3000/toys')
   .then(response => response.json() )
   .then(data => createToysDisplay(data))
  }

  function createToysDisplay(data) {
    data.forEach(function(dataElement){
          createToyCard(dataElement)
          // console.log(dataElement)
          // toyContainer.appendChild(createToyCard)
    })
  }

  function createToyCard(dataElement) {
     console.log(dataElement);      
        let toyCardHtml = ` 
        <div class="card" data-id="${dataElement.id}">
          <h2>${dataElement.name}</h2>
          <img src=${dataElement.image} class="toy-avatar" />
          <p>${dataElement.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div> `
    // toyContainer.innerHtml += toyCard
    toyContainer.innerHTML += toyCardHtml
  }

  function handleClickEvents(e){
    e.preventDefault()
    if(e.target.className === 'like-btn'){
      likeToy(e.target)
    // }else if(e.target.className === 'submit'){
    //   handleToyFormSubmit(e)
    //   console.log("Clicked Submit btn");
    }else{
      console.log("error or other thing clicked");
    }
  }


  function likeToy(target){
    updateDOM(target)     //
    updateServer(target) //
  }

  function updateDOM(target) {
    let likes = target.parentElement.querySelector('p')
    let currentLikes = parseInt(likes.innerHTML)
    let newLikes  = currentLikes + 1
    // console.log(newLikes);
    likes.innerHTML = `${newLikes} likes`
  }

  function updateServer(target) {
    let likes = target.parentElement.querySelector('p')
    let currentLikes = parseInt(likes.innerText)
    let cardId = target.parentElement.dataset.id
    // console.log(cardId);
    fetch(`http://localhost:3000/toys/${cardId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:
      JSON.stringify({
        "likes": currentLikes
      })
    })
    .then(res => res.json())
    .then(updatedToy => updatedToy) 
  }

  function handleToyFormSubmit(e){
    e.preventDefault()
  //  debugger
   let name = e.target.name.value
   let imageUrl = e.target.image.value
   console.log("this works")
    //let name = e.target.querySelector('#toy-name').value
   
   fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:
    JSON.stringify({
      "name": name,
      "image": imageUrl,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(anything => createToyCard(anything))
 }


