document.getElementById("clear").addEventListener("click", function () {
  var div = document.getElementById("id");
  while (div.lastElementChild) {
    div.removeChild(div.lastElementChild);
  }
  localStorage.clear();
});

function load() {
  var records = JSON.parse(localStorage.getItem("records"));

  for (let i = 0; i < records.length; i++) {
    createRecordDOM(records[i], i);
  }
}
window.onload = load;

function calculate() {
  var radios = document.getElementsByName("tip");
  var amount = document.getElementById("amount").value;
  var location = document.getElementById("location").value;
  var date = new Date();

  var obj = {
    date: date.toLocaleDateString("en-US"),
    time: date.toLocaleTimeString("en-US"),
    location: location,
    amount: amount,
    tip: 0,
    amount_tip: 0,
  };

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      obj.tip = radios[i].value;
      obj.amount_tip = ((1 + radios[i].value) * amount).toFixed(2);
      obj.tip = (obj.amount_tip - obj.amount).toFixed(2);
      break;
    }
  }

  if (obj.length == 0) {
    alert("Tip is required! Please choose tip option");
  } else {
    let records = JSON.parse(localStorage.getItem("records"));
    if (records) {
      records.push(obj);
      localStorage.setItem("records", JSON.stringify(records));
    } else {
      localStorage.setItem("records", JSON.stringify([obj]));
    }

    if (records == undefined) {
      records = [];
    }

    createRecordDOM(obj, records.length);
  }
}

function createRecordDOM(obj, index) {
  var container = document.createElement("div");
  var date = document.createElement("p");
  var time = document.createElement("p");
  var location = document.createElement("p");
  var amount = document.createElement("p");
  var tip = document.createElement("p");
  var amount_tip = document.createElement("p");
  var separator = document.createElement("p");
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", index);
  deleteButton.textContent = "REMOVE";
  deleteButton.addEventListener("click", function () {
    let records = JSON.parse(localStorage.getItem("records"));
    let divList = document.getElementById("id");
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    divList.removeChild(divList.childNodes[index + 1]);
  });

  date.textContent = "Date: " + obj.date;
  time.textContent = "Time: " + obj.time;
  location.textContent = "Store: " + obj.location;
  amount.textContent = "Bill amount: $ " + obj.amount.toString();
  tip.textContent = `Amount to tip: $ ${obj.tip}`;
  amount_tip.textContent = `Total amount: $ ${obj.amount_tip.toString()}`;
  separator.textContent = "--------------------------";

  container.appendChild(date);
  container.appendChild(time);
  container.appendChild(location);
  container.appendChild(amount);
  container.appendChild(tip);
  container.appendChild(amount_tip);
  container.appendChild(deleteButton);
  container.appendChild(separator);

  document.getElementById("id").appendChild(container);
}
