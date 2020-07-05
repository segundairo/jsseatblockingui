const seats = document.querySelectorAll(".seat");
const container = document.querySelector(".container");
let standard;
let premium;
let selected;
let blockedSeats=[];

function showUI() {
  //shows blocked seats in red and loads it into a variable from local storage
  blockedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
  if (blockedSeats !== null && blockedSeats.length > 0) {   
     blockedSeats.forEach((seat) => {
       seats[seat].classList.add('blocked')    
    })  
  } else {
    blockedSeats = []
  }
}

function showSeatStat() {
  // function computes total seat selected by type and grand total
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
  // This function displays seat number using the combinaion of row number and seat number and updates local storage
  const seatOutput = document.querySelector("#seat__no ");
  seatOutput.innerHTML = '' 
  const seatIndex = [...selected].map((seat) => [...seats].indexOf(seat))
  const seatNumbers = [...selected].map((seat) => {
    const seatAlpha = seat.innerText;
    const seatCol = document.querySelectorAll(
      `.${seatAlpha.toLowerCase()} > *`)
    const row = [...seatCol].indexOf(seat) + 1; 
    return `${seatAlpha}${row}`;
 
});
    
 
  if (!seatIndex !== null && seatIndex.length > 0) {
// this snippet updates local storage by concatenating items previously stored in the local storage with the newly selected items
    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex.concat(blockedSeats)))
      seatOutput.innerHTML = `<p class='seat__no'>${seatNumbers.join(", ")}</p>`;
  }
}


container.addEventListener("click", (e) => {
  // event triggered only when a seat has not been blocked and click is a seat within the container
  const item = e.target;

  if (item.classList.contains("seat")) {
    item.classList.toggle("selected");
    showSeatStat(); //Shows seat type, seat total selected
    showSelectedSeats();  //Shows seat number
  }
});

showUI() //populates UI and displays the blocked seats