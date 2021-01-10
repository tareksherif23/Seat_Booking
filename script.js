const container = document.querySelector('.container') // returns only one element
const seats = document.querySelectorAll('.row .seat:not(.occupied)') // returns a node list


const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')



let ticketPrice = parseInt(movieSelect.value); // OR ticketPrice = +movieSelect.value


populateUI();
// Update total and count
function updateSelectedCount() {

    const ticketPrice = localStorage.getItem('moviePrice')
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const seatsIndex = [...selectedSeats].map(s => [...seats].indexOf(s))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedCount = selectedSeats.length
    count.innerText = selectedCount
    total.innerText = selectedCount * ticketPrice;

}

//Get Data from Local Storage
function populateUI() {

    const movieIndex = localStorage.getItem('movieIndex')
    const ticketPrice = localStorage.getItem('moviePrice')
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats != null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {

                seat.classList.add('selected')
            }
        })
    }

    if (movieIndex !== null) {
        movieSelect.selectedIndex = movieIndex
    }
}


// Movie list event listener
movieSelect.addEventListener('change', e => {

    ticketPrice = +e.target.value
    localStorage.setItem('movieIndex', e.target.selectedIndex)
    localStorage.setItem('moviePrice', e.target.value)
    updateSelectedCount()

})



// Seat click event listener
container.addEventListener('click', e => {
    // console.log(e.target);
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //e.target.classList.add(''), toggle(''). remove('')
        // e.target.style.backgroundColor = 'green'
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

updateSelectedCount()