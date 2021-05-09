
if (window.location.pathname === "/settings/") {

    const localDeletedCategories = JSON.parse(localStorage.getItem("deletedCategories"))
    let deletedCategories = localDeletedCategories ? localDeletedCategories : []

    const toggleSwitches = document.querySelectorAll('.switch__check');
    toggleSwitches.forEach(toggleSwitch => {
        toggleSwitch.addEventListener('click', saveSwitchStatusToLS)

        const categoryName = toggleSwitch.id.replace('toggle', '').toLowerCase()

        if (deletedCategories.includes(categoryName)) {
            toggleSwitch.checked = false    
        } 
    })

    function saveSwitchStatusToLS(e) {
        const localDeletedCategories = JSON.parse(localStorage.getItem("deletedCategories"))
        let deletedCategories = localDeletedCategories ? localDeletedCategories : []
        const switchStatus = e.target.checked
        const categoryName = e.target.id.replace('toggle', '').toLowerCase()

        if (!switchStatus && !deletedCategories.includes(categoryName)) {
            deletedCategories.push(categoryName)
        }
        else if (switchStatus && deletedCategories.includes(categoryName)) {
            deletedCategories.splice(deletedCategories.indexOf(categoryName), 1)
        }

        localStorage.setItem('deletedCategories', JSON.stringify(deletedCategories))
        
        if (localDeletedCategories) {
            if (localDeletedCategories.length === 0) localStorage.removeItem('deletedCategories')    
        } 
    }

    // const categoriesLS = (() => {

    // })()













}