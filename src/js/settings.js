
if (window.location.pathname === "/settings/") {

    let toggleSwitches = document.querySelectorAll('.switch__check');
    const themeBtn = document.querySelector('.toggle-theme-button');
    
    addCategoriesToHTML()

    dragCategories()

    enableToggleSwitches()

    // TOGGLE SWITCHES EVENTLISTENER
    function enableToggleSwitches() {
        toggleSwitches.forEach(toggleSwitch => {
            toggleSwitch.addEventListener('click', e => categoriesLS.toggle(e))

            const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
            
            syncSwitchStateWithLS(categoryName, toggleSwitch)    
        })        
    }

    // SYNC TOGGLE SWITCH STATE WITH LOCALSTORAGE
    function syncSwitchStateWithLS(categoryName, toggleSwitch) {
        const deletedCategories = categoriesLS.get();
        if (deletedCategories.includes(categoryName)) toggleSwitch.checked = false    
    }

    // TOGGLE THEME BUTTON
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

    function saveCategoryOrderToLS() {
        toggleSwitches = document.querySelectorAll('.switch__check')
        let categoryNames = [];

        toggleSwitches.forEach(toggleSwitch => {
            const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()
            categoryNames.push(categoryName)    
        })

        categoryOrder.add(categoryNames)
    }

    function addCategoriesToHTML() {
        const categoryContainer = document.querySelector('.category-container');

        categoryOrder.get().forEach(categoryName => {
            const category = document.createElement('li')
            category.classList.add('category-content')
            category.innerHTML = `
            <h2 class="category-content__title">${categoryName}</h2>
            <label for="toggle${categoryName}" class="category-content__switch switch">
                <input type="checkbox" name="toggle${categoryName}" class="switch__check" checked="true" id="toggle${categoryName}"> 
                <span class="switch__slider switch__slider_round"></span>
            </label>       
            ` 
            categoryContainer.append(category)             
        })
    }

    function dragCategories() {
        const categoryContainer = document.querySelector('.category-container');
        new Slip(categoryContainer);

        categoryContainer.addEventListener('slip:reorder', function (e) {
            console.log('slip:reorder');

            e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
            saveCategoryOrderToLS()
        });
        // categoryContainer.addEventListener('slip:beforewait', function (e) {
        //     console.log('slip:beforewait');
        //     e.preventDefault()
        // });
        categoryContainer.addEventListener('slip:beforeswipe', function (e) {
            console.log('slip:beforeswipe');
            e.preventDefault();
        });        
    }

}
