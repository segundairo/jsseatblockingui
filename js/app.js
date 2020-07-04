const seats = document.querySelectorAll(".seat");
const container = document.querySelector(".container");
let standard;
let premium;
let selected;

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
  let seatNo = [];
  const seatNumbers = Array.from(selected).map((el) => {
    const seatAlpha = el.innerText;
    const seatCol = document.querySelectorAll(
      `.${seatAlpha.toLowerCase()} > *`
    );
    const row = Array.from(seatCol).indexOf(el) + 1;
    seatNo.push(`${seatAlpha}${row}`);
    console.log(seatNo);

    return Array.from(seats).indexOf(el);
  });
  seatOutput.innerHTML = `<p class='seat__no'>${seatNo.join(", ")}</p>`;
  console.log(seatNumbers);
}

container.addEventListener("click", (e) => {
  const item = e.target;

  if (item.classList.contains("seat")) {
    item.classList.toggle("selected");
    showSeatStat();
    showSelectedSeats();
  }
});
