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
                            <input type="button" value="-" class="minus" onclick="quantityModifier('${i}',-1)">
                            <input type="number"  value="${
                              list[i].cantitate
                            }" min="0" max="${
      list[i].stoc
    }" class="numValue" onchange="schimbaCantitatea(this,event,'${i}')">  
                            <input type="button" value="+"  class="plus" onclick="quantityModifier('${i}',1)"> 
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
async function quantityModifier(i, nr) {
  var response = await fetch(
    `https://proiect-final-marian.firebaseio.com/cos/.json`
  );
  window.list = await response.json();

  if (parseInt(list[i].cantitate) + parseInt(nr) <= list[i].stoc) {
    list[i].cantitate = parseInt(list[i].cantitate) + nr;
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
      {
        method: "put",
        body: parseInt(list[i].cantitate)
      }
    );
    document.querySelector(".backgroundLoader").classList.add("hidden");
  } else {
    $("#myModal").modal(options);
    alert("Ai depasit stocul");
  }
  await draw();
}

//   else if (checkValue === "-") {
//     var response = await fetch(
//       `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
//       {
//         method: "put",
//         body: parseInt(list[i].cantitate) - 1
//       }
//     );
//   } else checkValue === "+";
//   {
//     var response = await fetch(
//       `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
//       {
//         method: "put",
//         body: parseInt(list[i].cantitate) + 1
//       }
//     );
//   }
//   var response = await fetch(
//     `https://proiect-final-marian.firebaseio.com/cos/.json`
//   );
//   window.list = await response.json();
//   if (list[i].cantitate > 1 && list[i].cantitate <= list[i].stoc) {
//     document.querySelector(".backgroundLoader").classList.remove("hidden");
//     if (this.value === "-") {
//       var response = await fetch(
//         `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
//         {
//           method: "put",
//           body: parseInt(list[i].cantitate) - 1
//         }
//       );
//     } else if (this.value === "+") {
//       var response = await fetch(
//         `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
//         {
//           method: "put",
//           body: parseInt(list[i].cantitate) + 1
//         }
//       );
//     }
//     document.querySelector(".backgroundLoader").classList.add("hidden");
//   } else if (list[i].cantitate < 1) {
//     alert("Cantitatea minima este 1.");
//   } else if (list[i].cantitate > list[i].stoc) {
//     alert("Stoc maxim");
//   }
//   draw();
// }

// async function decrease(event, i) {
//   var response = await fetch(
//     `https://proiect-final-marian.firebaseio.com/cos/.json`
//   );
//   window.list = await response.json();
//   if (list[i].cantitate > 1) {
//     document.querySelector(".backgroundLoader").classList.remove("hidden");
//     var response = await fetch(
//       `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`, {
//         method: "put",
//         body: parseInt(list[i].cantitate) - 1
//       }
//     );
//     document.querySelector(".backgroundLoader").classList.add("hidden");
//   } else {
//     alert("Cantitatea minima este 1.");
//   }
//   draw();
// }
// async function increase(event, i) {
//   var response = await fetch(
//     `https://proiect-final-marian.firebaseio.com/cos/.json`
//   );
//   window.list = await response.json();
//   if (list[i].cantitate < list[i].stoc) {
//     document.querySelector(".backgroundLoader").classList.remove("hidden");
//     var response = await fetch(
//       `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`, {
//         method: "put",
//         body: parseInt(list[i].cantitate) + 1
//       }
//     );
//     document.querySelector(".backgroundLoader").classList.add("hidden");
//   } else {
//     alert("Stoc maxim");
//   }
//   draw();
// }
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
  if (input <= list[i].stoc && input > 0) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
      `https://proiect-final-marian.firebaseio.com/cos/${i}/cantitate.json`,
      {
        method: "put",
        body: parseInt(input)
      }
    );
    document.querySelector(".backgroundLoader").classList.add("hidden");
  } else if (input <= 0) {
    alert("Te rugam introdu un numar mai mare ca zero!");
  } else if (input > list[i].stoc) {
    alert("Cantitatea introdusa depaseste stocul existent!");
  }
}
