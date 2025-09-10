//  DOM Elements
const categoriesContainer = document.getElementById("categories-container");
const cardDetailsContainer = document.getElementById("card-details-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const allPlantsBtn = document.getElementById("all-plants-categories");

// State
let cart = [];

//  Helpers
const showLoading = () => {
  cardDetailsContainer.innerHTML = `
    <div class="col-span-3 flex justify-center items-center w-full">
      <span class="loading loading-dots loading-lg"></span>
    </div>
  `;
};

const fetchJson = (url) => {
  return fetch(url).then((res) => res.json());
};
// loadtreesDetail
const loadTreesDetail = (id) => {
  fetchJson(`https://openapi.programming-hero.com/api/plant/${id}`).then(
    (data) => {
      displayTreesDetail(data.plants);
    }
  );
};
const displayTreesDetail = (plant) => {
  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">${plant.name}</h2>
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-64 object-cover mb-4 rounded">
      <p class="mb-2"><strong>Category:</strong> ${plant.category}</p>
      <p class="mb-2"><strong>Price:</strong> ${plant.price}৳</p>
      <p class="mb-2"><strong>Description:</strong> ${plant.description}</p>
    </div>
  `;
  // Show the modal
  document.getElementById("my_modal_5").showModal();
};

//  Plants
const displayPlants = (plants) => {
  cardDetailsContainer.innerHTML = "";

  if (!plants || plants.length === 0) {
    cardDetailsContainer.innerHTML = `
      <p class="col-span-3 text-center text-gray-500">No plants found.</p>
    `;
    return;
  }

  plants.forEach((plant) => {
    const card = `
      <div class="border border-gray-300 bg-white rounded-md p-3 shadow-md hover:shadow-lg space-y-2">
        <figure class="rounded overflow-hidden">
          <img src="${plant.image}" class="h-48 w-full object-cover" alt="${plant.name}">
        </figure>
        <button class="text-left text-lg font-semibold hover:text-green-700 cursor-pointer" onclick="loadTreesDetail(${plant.id})">${plant.name}</button>
        <p class="text-[#1F2937] text-sm line-clamp-2">${plant.description}</p>
        <div class="flex justify-between items-center">
          <span class="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-2xl text-sm">${plant.category}</span>
          <p class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
        </div>
        <button 
          onclick="addToCart('${plant.id}', '${plant.name}', ${plant.price})" 
          class="w-full mt-2 bg-[#15803D] text-white rounded-lg py-2 hover:bg-green-700 cursor-pointer transition">
          Add to Cart
        </button>
      </div>
    `;
    cardDetailsContainer.innerHTML += card;
  });
};

// Cart
const addToCart = (id, name, price) => {
  cart.push({ id, name, price });
  renderCart();
  alert(`${name} added to cart!`);
};

const renderCart = () => {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <li class="flex justify-between items-center  pb-1 bg-[#F0FDF4] p-4 rounded font-medium">
       <div> 
       <span>${item.name}</span><br>
        <span>${item.price}৳</span>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-500 text-xs ml-2">✖</button>
      </li>
    `;
  });

  cartTotal.innerText = total;
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  renderCart();
};

// Categories
const loadCategories = () => {
  fetchJson("https://openapi.programming-hero.com/api/categories")
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error("Category error:", err));
};

const displayCategories = (categories) => {
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.className =
      "category-item hover:bg-green-500 text-black hover:text-white hover:rounded-sm py-1 px-1 font-medium cursor-pointer border border-gray-100 rounded-md  md:border-none";
    li.innerHTML = `<button class="text-left ">${category.category_name}</button>`;

    li.addEventListener("click", () => {
      loadCategoryPlants(category.id, li);
    });

    categoriesContainer.appendChild(li);
  });
};

const loadCategoryPlants = (id, element) => {
  showLoading();
  fetchJson(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((data) => {
      displayPlants(data.plants);
      setActiveCategory(element);
    })
    .catch((err) => console.error("Plants error:", err));
};

//  All Plants
const loadAllPlants = (element = null) => {
  showLoading();
  fetchJson("https://openapi.programming-hero.com/api/plants")
    .then((data) => {
      displayPlants(data.plants);
      if (element) setActiveCategory(element);
    })
    .catch((err) => console.error("All plants error:", err));
};

allPlantsBtn.addEventListener("click", () => {
  loadAllPlants(allPlantsBtn);
});

//  Active Category Highlight
const setActiveCategory = (element) => {
  document
    .querySelectorAll(".category-item, #all-plants-categories")
    .forEach((el) => {
      el.classList.remove("bg-[#15803D]", "text-white", "rounded-sm");
      el.classList.add("text-black");
    });

  element.classList.add("bg-[#15803D]", "text-white", "rounded-sm");
  element.classList.remove("text-black");
};

// Init
loadCategories();
loadAllPlants(allPlantsBtn);
renderCart();
