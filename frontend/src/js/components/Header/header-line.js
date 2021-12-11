const headerLine = document.getElementById('header-line')
const headerBrand = document.getElementById('header-brand')

isVisibleLine()
document.addEventListener('scroll', () => isVisibleLine())

function isVisibleLine () {
    if (window.scrollY > 150) {
        headerLine.className = 'visible'
        headerBrand.className = 'scrolled'
    } else {
        headerLine.className = ''
        headerBrand.className = ''
    }
}
