
(function syncThemeFromLS() {
    const page = document.querySelector('html')
    const theme = localStorage.getItem("theme")

    if (theme) page.setAttribute('data-theme', theme)
})()

function saveThemeToLS(theme) {
    localStorage.setItem("theme", theme)
}