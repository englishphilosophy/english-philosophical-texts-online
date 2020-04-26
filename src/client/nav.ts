const nav = document.querySelector('.nav') as HTMLElement

if (nav) {
  const offsetTop = nav.offsetTop

  window.addEventListener('scroll', (e) => {
    if (window.pageYOffset > offsetTop) {
      nav.classList.add('stuck')
    } else {
      nav.classList.remove('stuck')
    }
  })
}
