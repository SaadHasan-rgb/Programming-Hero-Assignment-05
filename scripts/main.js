// selecting elements
const btnAll = document.getElementById("tabAllIssues");
const btnOpen = document.getElementById("tabOpenIssues");
const btnClosed = document.getElementById("tabClosedIssues");

const gridArea = document.getElementById("issuesGrid");

const totalIssuesText = document.getElementById("issueCountText");

const loader = document.getElementById("loaderArea");

const emptyBox = document.getElementById("emptyResult");

const modal = document.getElementById("issueDetailsModal");
const modalBody = document.getElementById("modalDataArea");

const searchBtn = document.getElementById("searchActionBtn");
const searchInput = document.getElementById("searchInputField");

// storing issues globally
let storedIssues = [];


// showing and hiding loading spinner
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// fetching all issues from API
async function loadIssues() {

  showLoader();

  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );

  const result = await response.json();

  storedIssues = result.data;

  hideLoader();

  renderCards(storedIssues);

}

