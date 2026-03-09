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


// call function when page loads
loadIssues();


// creating issue cards
function renderCards(dataArray) {

  gridArea.innerHTML = "";

  totalIssuesText.innerText = dataArray.length;

  if (dataArray.length === 0) {
    emptyBox.classList.remove("hidden");
    return;
  }

  emptyBox.classList.add("hidden");

  dataArray.forEach(issue => {

    const dateText =
      new Date(issue.createdAt).toLocaleDateString("en-US");

    // setting border color based on status
    const borderClass =
      issue.status === "open"
        ? "border-[#00A96E]"
        : "border-[#A855F7]";

    const card = document.createElement("div");

    card.innerHTML = `

<div onclick="openIssueModal(${issue.id})"
class="p-4 border-t-5 ${borderClass} rounded-xl shadow-xl cursor-pointer">

<h3 class="font-semibold mt-3 mb-2 text-[14px] line-clamp-1">
${issue.title}
</h3>

<p class="text-[#64748B] mb-3 text-[12px] line-clamp-2">
${issue.description}
</p>

<p class="text-[#64748B] text-[12px]">#by ${issue.author}</p>

<p class="text-[#64748B] text-[12px]">${dateText}</p>

</div>

`;

    gridArea.appendChild(card);

  });

}

// modal with issue details
function openIssueModal(issueId) {

  const foundIssue =
    storedIssues.find(item => item.id === issueId);

  const dateText =
    new Date(foundIssue.createdAt).toLocaleDateString("en-US");

  modalBody.innerHTML = `

<h4 class="font-semibold text-[14px]">
${foundIssue.title}
</h4>

<p class="text-[#64748B] text-[12px] mt-3">
${foundIssue.description}
</p>

<p class="text-[12px] mt-3">
Opened by ${foundIssue.author}
</p>

<p class="text-[12px]">
${dateText}
</p>

`;

  modal.showModal();
}


// showing all issues
btnAll.addEventListener("click", function () {
  renderCards(storedIssues);
});


// filtering open issues
btnOpen.addEventListener("click", function () {

  const openList =
    storedIssues.filter(item => item.status === "open");

  renderCards(openList);

});


// filtering closed issues
btnClosed.addEventListener("click", function () {

  const closedList =
    storedIssues.filter(item => item.status === "closed");

  renderCards(closedList);

});


// search issues
searchBtn.addEventListener("click", async function () {

  const searchText = searchInput.value.trim();

  if (searchText === "") return;

  showLoader();

  const response = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`
  );

  const result = await response.json();

  hideLoader();

  renderCards(result.data);

  searchInput.value = "";

});