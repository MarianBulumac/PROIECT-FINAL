var list = [];
async function draw() {

    document.querySelector(".backgroundLoader").classList.remove("hidden");

    var response = await fetch(
        "https://proiect-final-marian.firebaseio.com/produse.json"
    );
    window.list = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";
    for (var i in list) {
        if (list[i] === null) {
            continue;
        }


        str += `
                <div class="col-lg-3 col-sm-6 col-xs-12 product">
                    <div class="boxBorder">
                        <div id="imgBox" class="verificaStoc">
                        <a href="../details/detalii.html?id=${i}"><img class="imgProd" src="${list[i].imagine}" alt="${list[i].nume}"></a>
                        </div>
                        <div>
                            <p id="nameObj">${list[i].nume}</p>
                        </div>
                        <div id="bottomBox">
                            <span id="price">${list[i].pret}</span> 
                            <span>Lei</span>
                            <a href="../details/detalii.html?id=${i}">
                                <button class="detailsButoane">Detalii</button>
                            </a>
                        </div>
                    </div>
                </div>   
            `;
        document.querySelector("#showProducts").innerHTML = str;
    }
    // if (list[i].stoc > 0) {
    //     document.querySelector(".verificaStoc").classList.remove("outOfStock");


    // } else if (list[i].stoc === 0) {
    //     document.querySelector(".verificaStoc").classList.add("outOfStock");

    // }
    // if (list[i].stoc <= 0) {
    //     document.getElementById("imgBox").style.opacity = "0.5";
    // }
}