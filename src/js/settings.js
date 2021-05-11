
if (window.location.pathname === "/settings/") {

    const toggleSwitches = document.querySelectorAll('.switch__check');
    const themeBtn = document.querySelector('.toggle-theme-button');

    
    themeBtn.addEventListener('click', () => {
        const page = document.querySelector('html')
        
       if (page.style.length === 0) {
        page.style.setProperty('--cBackground', '#2c2c2c')
        page.style.setProperty('--cFontDark', '#fdfdfd')           
       } else {
           page.removeAttribute('style')
       }

    })


    toggleSwitches.forEach(toggleSwitch => {
        toggleSwitch.addEventListener('click', e => categoriesLS.toggle(e))

        // SYNC SWITCH STATUS WITH LOCALSTORAGE
        const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
        const deletedCategories = categoriesLS.get()

        if (deletedCategories.includes(categoryName)) toggleSwitch.checked = false

        categoryOrder.add(categoryName)
    })
















}