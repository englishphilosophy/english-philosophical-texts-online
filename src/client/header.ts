const button = document.querySelector('header button') as HTMLButtonElement
const menu = document.querySelector('header nav') as HTMLElement

if (button && menu) {
  button.addEventListener('click', () => {
    menu.classList.toggle('open')
  })
}
