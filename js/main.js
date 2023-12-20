const newBtn = document.querySelector("#newBtn");
const inputs = document.querySelector("#inputs");
const saveBtn = document.querySelector(".btn-outline-success");
const updateBtn = document.querySelector("#updateBtn");
const siteUrl = document.querySelector("#siteUrl");
const siteName = document.querySelector("#siteName");
const bookmarks = document.querySelector(".bookmarks");
const search = document.querySelector("#search");
const alert = document.querySelector(".toast");
const alertBody = document.querySelector(".toast-body");

let site = { name: "", url: "" };
let slectedIndex;
let msg;

newBtn.addEventListener("click", function () {
  reset();
  inputs.classList.replace("d-none", "d-flex");
});

saveBtn.addEventListener("click", function () {
  store();
});

updateBtn.addEventListener("click", function () {
  update();
});

search.addEventListener("keyup", function () {
  searchSite();
});

if (localStorage.getItem("sites")) {
  sites = JSON.parse(localStorage.getItem("sites"));
  display(sites);
} else {
  sites = [{ name: "Moaz El Gandy", url: "github.com/moazelgandy2" }];
  display(sites);
}

function store() {
  let site = {
    name: siteName.value,
    url: siteUrl.value.trim(),
  };

  if (!validateURL(site.url)) {
    return;
  }

  if (site.url.startsWith("https://")) {
    site.url = site.url.replace("https://", "");
  }

  sites.push(site);

  saveToLocalStorage();

  display(sites);
  msg = 'The site "' + site.name + '" has been added successfully';
  displayAlert(msg);
  reset();
}

function display(sites) {
  let card = "";

  for (let i = 0; i < sites.length; i++) {
    card += `<div class="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-3">${sites[i].name}</h5>
              <p class="card-text">
                <a href="https://${sites[i].url}" target="_blank">${sites[i].url} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
              </p>
              <div class="btns d-flex justify-content-start">
                <button onclick=(updateForm(${i})) href="#" class="btn btn-sm btn-primary me-1">Edit</button>
                <button onclick=(deleteSite(${i})) href="#" class="btn btn-sm btn-outline-secondary">Delete</button>
              </div>
            </div>
          </div>
        </div>`;
  }
  bookmarks.innerHTML = card;
}

function displayAlert(msg) {
  alert.classList.add("show");

  alertBody.innerHTML = msg;

  setTimeout(function () {
    alert.classList.remove("show");
  }, 2500);
}

function saveToLocalStorage() {
  localStorage.setItem("sites", JSON.stringify(sites));
}

function update() {
  sites[slectedIndex].name = siteName.value;

  sites[slectedIndex].url = siteUrl.value;

  if (!validateURL(sites[slectedIndex].url)) {
    return;
  }

  if (sites[slectedIndex].url.startsWith("https://")) {
    sites[slectedIndex].url = sites[slectedIndex].url.replace("https://", "");
  }

  saveToLocalStorage();

  display(sites);

  msg = "The site  has been updated successfully";

  displayAlert(msg);

  reset();
}

function updateForm(index) {
  inputs.classList.replace("d-none", "d-flex");

  updateBtn.classList.replace("d-none", "d-flex");

  saveBtn.classList.add("d-none");

  siteName.value = sites[index].name;

  siteUrl.value = sites[index].url;
  slectedIndex = index;
}

function deleteSite(index) {
  console.log("%c" + sites[index].name + " Has been deleted", "color: red");

  sites.splice(index, 1);

  saveToLocalStorage();

  display(sites);
  msg = "The site has been deleted successfully";
  displayAlert(msg);
}

function searchSite() {
  let term = search.value.toLowerCase();
  let searchResult = [];
  for (let i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(term)) {
      searchResult.push(sites[i]);
    }
  }

  display(searchResult);
}

function reset() {
  siteName.value = "";

  siteUrl.value = "";
  updateBtn.classList.replace("d-flex", "d-none");
  saveBtn.classList.remove("d-none");
  inputs.classList.replace("d-flex", "d-none");
}

//! Vlidation functions

function validateURL(url) {
  const urlRegex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/\S*)?$/;

  if (!urlRegex.test(url)) {
    window.alert("Please enter a valid URL");
    return false;
  }

  const domainMatch = url.match(urlRegex);
  const domain = domainMatch[3]; // Extract the domain part from the URL

  const validDomains = [
    ".com",
    ".net",
    ".co",
    ".eg",
    ".sa",
    ".me",
    ".org",
    ".tech",
    ".store",
    ".online",
    ".live",
  ]; // Add more extensions as needed

  if (!validDomains.some((ext) => domain.endsWith(ext))) {
    window.alert(
      "Please enter a URL with a valid domain extension (e.g., .com, .net, .co, .eg)"
    );
    return false;
  }

  return true;
}

function validateExist() {
  if (sites.includes(siteUrl.value)) {
    alert("This URL already exists");
    return false;
  }
  return true;
}
