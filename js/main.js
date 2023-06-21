//? json-server -w db.json -p 8000

// api for requests
const API = "http://localhost:8000/products";

// elems from html
const list = document.querySelector("#product-list");

// form with inputs for adding
const addForm = document.querySelector("#add-form");
const titleInp = document.querySelector("#title");
const priceInp = document.querySelector("#price");
const descriptionInp = document.querySelector("#description");
const imageInp = document.querySelector("#image");

// function to get info
async function getProducts() {
  const res = await fetch(API); //from api
  const data = await res.json(); // reader api

  return data; //return json
}

// function for add product
async function addProduct(newProduct) {
  await fetch(API, {
    method: "POST", //  method
    body: JSON.stringify(newProduct), // elems wich we want to post
    headers: {
      // type of content
      "Content-Type": "application/json",
    },
  });
  render(); //render to show actual products
}

// to show when we open window
render();

// function to show elems
async function render() {
  // getting actual elems
  const data = await getProducts();
  //   clear list for dont duble cards
  list.innerHTML = "";

  //   looking for get elems and for each elems adding card
  data.forEach((item) => {
    list.innerHTML += `<div class="card m-5" style="width: 18rem">
    <img
      src="${item.image}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">
        ${item.description.slice(0, 70)}...
      </p>
      <p class="card-text">${item.price}$</p>
      <button class="btn btn-dark w-25">Edit</button>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>`;
  });
}

// add form
addForm.addEventListener("submit", (e) => {
  // for window dont download
  e.preventDefault();
  // looking for dont empty inputs
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !imageInp.value.trim() ||
    !descriptionInp.value.trim()
  ) {
    alert("Enter all inputs");
    return;
  }

  // create object from inp.value
  const product = {
    title: titleInp.value,
    price: priceInp.value,
    description: descriptionInp.value,
    image: imageInp.value,
  };

  // add object
  addProduct(product);

  // return empty inputs
  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  descriptionInp.value = "";
});
