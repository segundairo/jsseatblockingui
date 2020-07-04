const seats = document.querySelectorAll(".seat");
const container = document.querySelector(".container");
let standard;
let premium;
let selected;

function showUI() {
  const blockedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
  if (blockedSeats !== null && blockedSeats.length > 0) {
    blockedSeats.forEach((seat) => {
      seats[seat].classList.add('blocked')    
   })  
  }
}

function showSeatStat() {
  // const blocked = document.querySelectorAll('.seats__container > div > *:not(.blocked)')
  // const blocked = document.querySelectorAll('.seats__container > div:not(:first-of-type) > *:not(.blocked)')
  selected = document.querySelectorAll(".selected");
  if (selected) {
    const premium = document.querySelectorAll(".selected.premium").length;
    let selectNo = selected.length;
    const standard = selectNo - premium;

    document.getElementById("premium").innerText = premium;
    document.getElementById("standard").innerText = standard;
    document.getElementById("total").innerText = selectNo;
  }
}

function showSelectedSeats() {
  const seatOutput = document.querySelector("#seat__no ");
  
  const seatIndex = [...selected].map((seat) => [...seats].indexOf(seat))
  const seatNumbers = [...selected].map((seat) => {
    const seatAlpha = seat.innerText;
    const seatCol = document.querySelectorAll(
      `.${seatAlpha.toLowerCase()} > *`)
    const row = [...seatCol].indexOf(seat) + 1;
    return `${seatAlpha}${row}`;
 
});
    
   console.log(seatIndex);
   
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex))
  
  seatOutput.innerHTML = `<p class='seat__no'>${seatNumbers.join(", ")}</p>`;
}


container.addEventListener("click", (e) => {
  const item = e.target;

  if (item.classList.contains("seat")) {
    item.classList.toggle("selected");
    showSeatStat();
    showSelectedSeats();       
  }
});

showUI()