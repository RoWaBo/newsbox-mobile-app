
if (window.location.pathname === "/settings/") {

    const toggleSwitches = document.querySelectorAll('.switch__check');
    const themeBtn = document.querySelector('.toggle-theme-button');

    themeBtn.addEventListener('click', e => toggleTheme("light", "dark"))

    function toggleTheme(primary, secondary) {
        const page = document.querySelector('html')

        if (page.getAttribute('data-theme') === primary) {
            page.setAttribute('data-theme', secondary)
            saveThemeToLS(secondary)
        } else {
            page.setAttribute('data-theme', primary)
            saveThemeToLS(primary)
        }
    }

    toggleSwitches.forEach(toggleSwitch => {
        toggleSwitch.addEventListener('click', e => categoriesLS.toggle(e))

        // SYNC SWITCH STATUS WITH LOCALSTORAGE
        const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
        const deletedCategories = categoriesLS.get()

        if (deletedCategories.includes(categoryName)) toggleSwitch.checked = false

        categoryOrder.add(categoryName)
    })
}
