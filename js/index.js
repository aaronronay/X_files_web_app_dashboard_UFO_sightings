const $tbody = document.querySelector("tbody");
const $inputs = Object.fromEntries(
  ["dateTime", "city", "state", "country", "shape"].map((key) => [
    key,
    document.querySelector(`#${key}`)
  ])
);
const $searchBtn = document.querySelector("#search");
const $recordCounter = document.querySelector("#recordCounter");
const $pages = document.querySelector("#pages");
const $loadBtn = document.querySelector("#load");
const $nextBtn = document.querySelector("#next");
const $prevBtn = document.querySelector("#prev");

let filteredData = dataSet;
let count = 0;

$searchBtn.addEventListener("click", handleSearch);
$loadBtn.addEventListener("click", handleReload);
$nextBtn.addEventListener("click", () => handlePagination(1));
$prevBtn.addEventListener("click", () => handlePagination(-1));
$pages.addEventListener("change", renderTable);

renderTable();

function handlePagination(direction) {
  count += direction;
  renderTable();
}

function handleSearch() {
  const filters = Object.fromEntries(
    Object.entries($inputs).map(([key, input]) => [
      key,
      input.value.trim().toLowerCase()
    ])
  );

  filteredData = dataSet.filter((data) =>
    Object.entries(filters).every(([key, value]) => data[key] === value)
  );

  renderTable();
}

function handleReload() {
  count = 0;
  filteredData = dataSet;
  Object.values($inputs).forEach((input) => (input.value = ""));
  renderTable();
}

function renderTable() {
  const pages = Number($pages.value);
  const start = count * pages;
  const end = start + pages;
  const dataSubset = filteredData.slice(start, end);

  $tbody.innerHTML = "";
  $nextBtn.disabled = end >= filteredData.length;
  $prevBtn.disabled = start === 0;
  $recordCounter.textContent = `From Record: ${start + 1} to: ${Math.min(
    end,
    filteredData.length
  )} of ${filteredData.length}`;

  dataSubset.forEach((data) => {
    const $row = $tbody.insertRow();
    Object.values(data).forEach((value) => {
      $row.insertCell().textContent = value;
    });
  });
}
