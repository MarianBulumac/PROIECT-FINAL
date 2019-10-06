var produse = [];
var i = window.location.search.substring(4);
async function detalii() {
    document.querySelector(".backgroundLoader").classList.remove("hidden");

    var response = await fetch(
        `https://proiect-final-marian.firebaseio.com/produse/${i}.json`
    );
    window.produse = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";

    str += `
    <div class="column"><img class="imgProd" src="${produse.imagine}" alt="${produse.nume}"></div>
                
                <div class="column">
                   <p id="adaugaNume">${produse.nume}</p>
                   <p id="">${produse.descriere}</p>
                   <p id="adaugaPret">Pret: ${produse.pret} RON</p>
                   <hr>
                   <p>In stoc: ${produse.stoc}</p>
                   <label>Cantitate: </label><input type="number" id="cantitate" value="1" min="1" max="${produse.stoc}"style="width:50px"/>
                   
                   <div><button onclick="addCos(event,'${i}');" class="adaugaButton" type="button">ADAUGA IN COS</button></div>
                </div>
                
     
 `;
    document.querySelector("#afisareLista").innerHTML = str;

}

// async function addCos() {
//     var obj = {
//         imagine: produse.imagine,
//         nume: produse.nume,
//         pret: produse.pret,
//         stoc: produse.stoc,
//         cantitate: document.querySelector("#cantitate").value
//     }
//     var response = await fetch(
//         `https://proiect-final-marian.firebaseio.com/cos/${i}.json`, {
//             method: "put",
//             body: JSON.stringify(obj)
//         }
//     );
//     alert("Produsul a fost adaugat in cosul de cumparaturi");
// }




async function addCos(event, i) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");

    var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${i}.json`);
    document.querySelector(".backgroundLoader").classList.add("hidden");
    produseCos = await response.json();
    var found = false;
    var val = document.querySelector("#cantitate").value;
    if (produseCos !== null) {
        if (confirm("Produsul a mai fost adaugat in cos. Esti sigur ca vrei sa continui?")) {
            if (parseInt(val) + parseInt(produseCos.cantitate) <= produse.stoc) {
                produseCos.cantitate = parseInt(produseCos.cantitate) + parseInt(document.querySelector("#cantitate").value);
                var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`, {
                    method: "put",
                    body: produseCos.cantitate


                });
            } else {
                alert('Cantitatea selectata depaseste stocul existent!');
            }

        }


    } else if (parseInt(val) <= produse.stoc) {
        var obj = {
            imagine: produse.imagine,
            nume: produse.nume,
            descriere: produse.descriere,
            pret: produse.pret,
            stoc: produse.stoc,
            cantitate: document.querySelector("#cantitate").value

        }
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://proiect-final-marian.firebaseio.com/cos/${i}.json`, {
            method: "put",
            body: JSON.stringify(obj)

        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
        alert("Produsul a fost adaugat in cos")

    } else {
        alert('Cantitatea selectata depaseste stocul existent!');
    }
}