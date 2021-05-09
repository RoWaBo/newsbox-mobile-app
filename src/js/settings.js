
if (window.location.pathname === "/settings/") {

    const toggleSwitches = document.querySelectorAll('.switch__check');

    toggleSwitches.forEach(toggleSwitch => {
        toggleSwitch.addEventListener('click', e => categoriesLS.toggle(e))

        // SYNC SWITCH STATUS WITH LOCALSTORAGE
        const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
        const deletedCategories = categoriesLS.get()

        if (deletedCategories.includes(categoryName)) toggleSwitch.checked = false

        categoryOrder.add(categoryName)
    })
















}