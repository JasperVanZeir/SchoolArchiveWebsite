function elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

function loadVouches(endpoint) {
    removeContent();
    fetch(`http://104.131.62.197/${endpoint}`)
        .then((response) => response.json())
        .then((data) => {
            fetch("http://104.131.62.197/api/leerlingen/count")
                .then((response) => response.json())
                .then((rcount) => {
                    appendVouches(rcount, data);
                });
        });
}


function createVouchElement(leerling) {
    const className = leerling.leerling_id % 2 == 0 ? "change_c" : "";

    return `<tr class="focus:outline-none h-14 border border-gray-100 text-gray-500 text-md font-medium hover:text-gray-800 hover:bg-gray-50">
    <td>
       <div class="flex items-center pl-5">
          <p class="ml-2">${leerling.voornaam} ${leerling.achternaam}</p>
       </div>
    </td>
    <td class="pl-24">
       <div class="flex items-center">
          <p class="ml-2">${leerling.email}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="ml-2">${leerling.richting}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="ml-2">${leerling.geslacht}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="ml-2">${leerling.geboortejaar}</p>
       </div>
    </td>
    <td>
       <div class="pr-4">
          <button id="editLeerlingButton" data-modal-toggle="editLeerling" class="mt-4 sm:mt-0 inline-flex items-start justify-start py-3 px-8 rounded-lg float-right">
             <p class="customcolorblue">Edit</p>
          </button>
       </div>
    </td>
 </tr>
    `;
}

function appendVouches(rcount, { count, leerlingen }) {
    document.getElementById("leerlingCount").innerHTML = rcount.totalcount;
    document.getElementById("AITCount").innerHTML = rcount.AIT;
    document.getElementById("ITNCount").innerHTML = rcount.ITN;
    document.getElementById("MOCount").innerHTML = rcount.MO;
    document.getElementById("OMCCount").innerHTML = rcount.OMC;

    const tableBody = document.getElementById("tbody");

    for (const leerling of leerlingen) {
        const leerlingElement = createVouchElement(leerling);
        tableBody.appendChild(elementFromHtml(leerlingElement));
    }
}

function reverseTable() {
    const vouches = document.querySelectorAll(".vouch");

    vouches.forEach((vouch) => vouch.remove());
    vouchesData.vouches.reverse();

    appendVouches(vouchesData);
}

function removeContent() {
    // remove all content from the table
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";
}

loadVouches("api/leerlingen");
