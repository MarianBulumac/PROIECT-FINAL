async function draw() {
  var transport = 0;
  var total = 0;
  var totalProduse = 0;
  document.querySelector(".backgroundLoader").classList.remove("hidden");
  var response = await fetch(
    `https://proiect-final-marian.firebaseio.com/cos/.json`
  );
  window.list = await response.json();
  document.querySelector(".backgroundLoader").classList.add("hidden");
  var str = "";
  for (var i in list) {
    if (list[i] === null) continue;
    total = total + list[i].cantitate * list[i].pret;
    totalProduse = totalProduse + list[i].cantitate;
    transport = transport + list[i].cantitate;

    str += ` 
                    <tr>
                   
                        <th scope="row" name="nume"> <a href="../details/detalii.html?id=${i}">${
      list[i].nume
    }</a></th>
                        <td name="imagine"><a href="../details/detalii.html?id=${i}"><img style="width:100px; height=100px;" src="${
      list[i].imagine
    }" alt='' /></a></td>
                        <td name="pret">${list[i].pret}</td>
                        <td name="cantitate">
                            <input type="button" value="-" class="minus" onclick="decrease(event,'${i}')">
                            <input type="number"  value="${
                              list[i].cantitate
                            }" min="1" max="${
      list[i].stoc
    }" class="numValue" onchange="schimbaCantitatea(this,event,'${i}')">  
                            <input type="button" value="+"  class="plus" onclick="increase(event,'${i}')"> 
                       </td>
                        <td name="subTotal">${list[i].cantitate *
                          list[i].pret}</td>
                        <td><input type="button" value="STERGE" class="delBut" onclick="sterge(event,'${i}')"></td>
                    </tr>
    `;
  }
  document.querySelector("#showProducts table tbody").innerHTML = str;

  document.querySelector("#products").innerHTML = totalProduse;
  document.querySelector("#totalPrice").innerHTML = total;
  document.querySelector("#tva").innerHTML = (19 / 100) * total;
  document.querySelector("#transport").innerHTML = transport * 5;
}
async function decrease(event, i) {
  if (list[i].cantitate > 1) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
      {
        method: "put",
        body: parseInt(list[i].cantitate) - 1
      }
    );
    document.querySelector(".backgroundLoader").classList.add("hidden");
  } else {
    alert("Cantitatea minima este 1.");
  }
  draw();
}
async function increase(event, i) {
  if (list[i].cantitate < list[i].stoc) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
      {
        method: "put",
        body: parseInt(list[i].cantitate) + 1
      }
    );
    document.querySelector(".backgroundLoader").classList.add("hidden");
  } else {
    alert("Stoc maxim");
  }
  draw();
}
async function sterge(event, i) {
  if (confirm("Esti sigur ca vrei sa stergi acest produs")) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/cos/${i}.json`,
      {
        method: "delete"
      }
    );
  }
  document.querySelector(".backgroundLoader").classList.add("hidden");

  draw();
}

async function schimbaCantitatea(elem, event, i) {
  var input = elem.value;

  if (list[i].cantitate > 0 || list[i].cantitate < list[i].stoc) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
      {
        method: "put",
        body: parseInt(input)
      }
    );
    document.querySelector(".backgroundLoader").classList.add("hidden");
  } else {
    alert("Alerta!");
  }
}

//else if (list[i].cantitate <= list[i].stoc) {
//   var response = await fetch(
//     `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
//     {
//       method: "put",
//       body: parseInt(input)
//     }
//   );

//   input = 1;
// }
