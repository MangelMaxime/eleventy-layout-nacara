const scrollMenuOrTableOfContentIfNeeded = () => {

    // Make the table of content visible
    const $tableOfContentElement = document.querySelector(".table-of-content");
    const $activeMenuItemElement = document.querySelector(".menu .is-active");

    if ($tableOfContentElement !== null) {
        scrollIntoView($tableOfContentElement, {
            scrollMode: "if-needed",
            block: 'nearest',
            inline: 'nearest',
            boundary: document.querySelector(".menu-container")
        });
    } else if ($activeMenuItemElement !== null) {
        scrollIntoView($activeMenuItemElement, {
            scrollMode: "if-needed",
            block: 'nearest',
            inline: 'nearest',
            boundary: document.querySelector(".menu-container")
        });
    }
}

// The page is ready to execute our code
if (document.readyState === "complete") {
    scrollMenuOrTableOfContentIfNeeded();
    // The page is not ready, wait for it to be ready
} else {
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            scrollMenuOrTableOfContentIfNeeded();
        }
    }
}
