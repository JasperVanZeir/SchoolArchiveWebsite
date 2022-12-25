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

    return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    ${leerling.voornaam} ${leerling.achternaam}
    </th>
    <td class="py-4 px-6">
    ${leerling.email}
    </td>
    <td class="py-4 px-6">
    ${leerling.richting}
    </td>
    <td class="py-4 px-6">
    ${leerling.geslacht}
    </td>
    <td class="py-4 px-6">
    ${leerling.geboortejaar}
    </td>
    <td class="py-4 px-6 text-right">
        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    </td>
</tr>
    `;
}

function createVouchElement(leerling) {
    const className = leerling.leerling_id % 2 == 0 ? "change_c" : "";

    return `                           <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 rounded">
    <td class="">
       <div class="flex items-center pl-5">
          <p class="font-medium text-md leading-none text-gray-700 mr-2">${leerling.voornaam} ${leerling.achternaam}</p>
       </div>
    </td>
    <td class="pl-24">
       <div class="flex items-center">
          <p class="text-md leading-none text-gray-500 font-medium ml-2">${leerling.email}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="text-md leading-none text-gray-500 font-medium ml-2">${leerling.richting}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="text-md leading-none text-gray-500 font-medium ml-2">${leerling.geslacht}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="text-md leading-none text-gray-500 font-medium ml-2">${leerling.geboortejaar}</p>
       </div>
    </td>
    <td>
       <div class="pr-4">
          <button class="mt-4 sm:mt-0 inline-flex items-start justify-start py-3 px-8 text-md font-medium rounded-lg float-right">
             <p class="text-md font-medium leading-none customcolorblue">Edit</p>
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
