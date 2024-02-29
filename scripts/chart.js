const MAX_HEIGHT = 150
let MAX_EXPENSE = -1
let data = []

const chart = document.getElementById('chart')


async function readData() {
    data = await fetch('./scripts/data.json')
        .then(async (response) => await response.json())
        .then((json) => json);

}
function setMax() {
    MAX_EXPENSE = data.reduce((currentMax, { amount }) => Math.max(currentMax, amount), 0)
}
calculateHeight = (amount) => ((amount / MAX_EXPENSE) * MAX_HEIGHT)

function displayExpenseBar({ day, amount }) {
    let barContainer = document.createElement('div')
    barContainer.classList.add('chart__bar-container')

    let bar = document.createElement('div')
    bar.classList.add('chart__bar')
    bar.style.setProperty('--bar-height', calculateHeight(amount) + 'px')
    bar.style.setProperty('--amount', `"$${amount}"`)
    bar.dataset.amount = amount

    let dayContainer = document.createElement('p')
    dayContainer.classList.add('chart__day')
    dayContainer.innerText = day

    barContainer.appendChild(dayContainer)
    barContainer.appendChild(bar)

    chart.appendChild(barContainer)
}

async function displayExpensesBars() {
    await readData()
    setMax()
    data.forEach(displayExpenseBar)
}
document.addEventListener('DOMContentLoaded', displayExpensesBars)