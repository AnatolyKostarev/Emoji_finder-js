'use strict'

const $cards = document.querySelector('.js-cards-emoji')
const $findEmoji = document.querySelector('.js-header-search')
const url = 'https://emoji-api-app.herokuapp.com/'

const getEmoji = async url => {
  const response = await (await fetch(url)).json()
  return response
}

const data = await getEmoji(url)

renderCard(data)

$findEmoji.addEventListener('input', () => searchEmoji(data))

function renderCard(arr) {
  $cards.innerHTML = ''
  arr.forEach(item => {
    let keyWords = item.keywords
      .split(' ')
      .filter((elem, index, arr) => index == arr.indexOf(elem))
      .join(' ')
    let divCard = document.createElement('div')
    divCard.classList.add('cards__item')
    divCard.innerHTML = `<p class="cards__symbol">${item.symbol}</p>
      <p class="cards__title">${item.title}</p>
      <p class="cards__keywords">${keyWords}</p>`
    $cards.append(divCard)
  })
}

function searchEmoji(arr) {
  let $title = $findEmoji.value.toLowerCase().trim()
  let filtered = arr.filter(
    item =>
      item.keywords.toLowerCase().includes($title) ||
      item.title.toLowerCase().includes($title)
  )
  renderCard(filtered)
}
