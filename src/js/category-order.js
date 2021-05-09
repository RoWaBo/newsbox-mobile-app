const categoryOrder = (() => {
    const defaultCategories = ["europe","health", "sports", "business", "technology"]
    let allCategories = [];
    
    return {
        add: categoryName => {
            allCategories.push(categoryName)
            localStorage.setItem('categoryOrder', JSON.stringify(allCategories))    
        },
        get: () => {
            const localCategoryOrder = JSON.parse(localStorage.getItem("categoryOrder"))
            let categoryOrder = localCategoryOrder ? localCategoryOrder : defaultCategories
            return categoryOrder    
        } 
    }
})();