// --- Nav dropdown listeners
document.getElementById("li_dropdown").addEventListener("mouseover", showMenu);
document.getElementById("li_dropdown").addEventListener("mouseout", hideMenu);

function showMenu() {
  document.getElementById("dropdown").classList.add("active");
  document.getElementById("li_dropdown").classList.add("stayHovered");
}

function hideMenu() {
  var hide = document.getElementById("dropdown");
  if (hide.onmouseover == true) {
  } else {
    hide.classList.remove("active");
    document.getElementById("li_dropdown").classList.remove("stayHovered");
  }
}

// --- Side Content Toggle

document.addEventListener(
  "click",
  function(event) {
    event.preventDefault();
    if (!event.target.classList.contains("toggleContent")) return;

    var content = document.querySelector(event.target.hash);
    if (!content) return;
    var activeRomoval = document.querySelectorAll(".close");

    // console.log(activeRomoval);
    content.classList.toggle("close");
    if (!activeRomoval) return;
    else {
      activeRomoval.forEach(item => item.classList.remove("close"));
    }
  },
  false
);

// --- XMLHttp Request part plus parsing

const table = document.querySelector("#table-content > thead");
const tbody = document.querySelector("#table-content > tbody ");

function loadRankings() {
  const request = new XMLHttpRequest();

  request.open("get", "http://cdn.sbtech.com/rj/mocks/MOCK_DATA.json", true);

  request.onload = () => {
    try {
      var json = JSON.parse(request.responseText);

      populateRankings(json);
    } catch (e) {
      console.warn("cannot load");
    }
  };
  request.send();
}

function populateRankings(json) {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  // console.log(json[0][0]);

  console.log(Object.values(json[0]));

  for (var i in json) {
    var count = Object.keys(json[0])[i];
    const th = document.createElement("th");

    th.textContent = count;
    if (th.textContent == "") break;
    table.appendChild(th);
  }

  for (var i in json) {
    const tr = document.createElement("tr");
    tbody.append(tr);
    for (j in json) {
      var count = Object.values(json[i])[j];
      const td = document.createElement("td");

      td.textContent = count;
      if (td.textContent == "") break;
      tr.append(td);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadRankings();
});
