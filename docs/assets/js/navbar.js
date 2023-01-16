const setupNavbarBurger = () => {
    /*
     * Setup menu burger behaviour
     */

    // Code copied from Bulma documentation
    // https://bulma.io/documentation/components/navbar/#navbar-menu

    const $navbarBurgerDots = document.querySelector(".navbar-burger-dots");

    if ($navbarBurgerDots !== null) {
        $navbarBurgerDots.addEventListener("click", (ev) => {
            const $nacaraNavbarMenu = document.querySelector(
                ".nacara-navbar-menu"
            );

            if ($nacaraNavbarMenu !== null) {
                $nacaraNavbarMenu.classList.toggle("is-active");
                $navbarBurgerDots.classList.toggle("is-active");
            }
        });
    }
};

const setupMobileMenu = () => {
    const mobileMenuTrigger = document.querySelector(
        ".mobile-menu .menu-trigger"
    );

    if (mobileMenuTrigger !== null) {
        mobileMenuTrigger.addEventListener("click", () => {
            document
                .querySelector(".is-menu-column")
                .classList.toggle("force-show");

            mobileMenuTrigger.classList.toggle("is-active");
        });
    }
};

const setupNavbarDropdown = () => {
    // Generate a unique data-id attribute for each dropdown
    // We do it at runtime to keep the HTML output clean
    // If user re-generate a page without changing the content the HTML output will be the same
    let nextDropdownId = 0;

    document
        .querySelectorAll(".navbar-item.has-nacara-dropdown")
        .forEach(function (navbarItem) {
            navbarItem.setAttribute("data-id", nextDropdownId);
            nextDropdownId++;
        });

    document
        .querySelectorAll(".navbar-item.has-nacara-dropdown")
        .forEach(function (navbarItem) {
            navbarItem.addEventListener("click", (ev) => {
                // Click is inside the dropdown element, nothing to do
                if (ev.target.closest(".nacara-dropdown")) {
                    return;
                }

                const $activeDropdownItem = document.querySelector(
                    ".navbar-item.has-nacara-dropdown.is-active"
                );

                // If we clicked on the active dropdown close it
                if ($activeDropdownItem) {
                    const activeItemId =
                        $activeDropdownItem.attributes.getNamedItem(
                            "data-id"
                        ).value;
                    const clickedItemId =
                        navbarItem.attributes.getNamedItem("data-id").value;

                    // If user clicked on the active dropdown item, close everything
                    if (activeItemId === clickedItemId) {
                        // Close the dropdown
                        $activeDropdownItem.classList.remove("is-active");
                        // Remove the overlay
                        $greyOverlay.classList.remove("is-active");
                    } else {
                        // The user clicked on another dropdown item, close the active one
                        $activeDropdownItem.classList.remove("is-active");
                        // Show the new dropdown as active
                        navbarItem.classList.add("is-active");
                    }
                } else {
                    // Show the overlay
                    $greyOverlay.classList.add("is-active");
                    // Show which dropdown is active
                    navbarItem.classList.add("is-active");
                }
            });
        });

    const navbarDropdownTimeoutCache = {};

    // Fullwidth dropdown needs to handle the hover event via JavaScript to add a small delay
    // before hiding the dropdown when the mouse leave
    // This is because when displaying a dropdown in fullwidth there is a gap between
    // the dropdown-link and the dropdown content
    document
        .querySelectorAll(".navbar-item.has-nacara-dropdown.is-fullwidth")
        .forEach(function (navbarItem) {
            navbarItem.addEventListener("mouseenter", function () {
                const itemGuid =
                    navbarItem.attributes.getNamedItem("data-id").value;

                // If there is already a timeout for this dropdown cancel it
                if (navbarDropdownTimeoutCache[itemGuid]) {
                    clearTimeout(navbarDropdownTimeoutCache[itemGuid]);
                    delete navbarDropdownTimeoutCache[itemGuid];
                }

                // Add the CSS class which force to show the dropdown from the JS
                navbarItem.classList.add("is-hovered-js");

                // When the mouse leave, wait a small amount of time before removing the CSS class
                navbarItem.addEventListener(
                    "mouseleave",
                    function (ev) {
                        const timeoutId = setTimeout(() => {
                            navbarItem.classList.remove("is-hovered-js");
                            delete navbarDropdownTimeoutCache[itemGuid];
                        }, 200);
                        // Store the timeoutID so we can cancel it if the user make some back and forth
                        // between the link and the dropdown content
                        navbarDropdownTimeoutCache[itemGuid] = timeoutId;
                    },
                    { once: true }
                );
            });
        });

    const $greyOverlay = document.querySelector(".grey-overlay");

    if ($greyOverlay !== null) {
        $greyOverlay.addEventListener("click", (ev) => {
            const $activeDropdownItem = document.querySelector(
                ".navbar-item.has-nacara-dropdown.is-active"
            );

            if ($activeDropdownItem) {
                $activeDropdownItem.classList.remove("is-active");
                $greyOverlay.classList.remove("is-active");
            }
        });
    }
};

// The page is ready to execute our code
if (document.readyState === "complete") {
    setupNavbarBurger();
    setupNavbarDropdown();
    setupMobileMenu();
    // The page is not ready, wait for it to be ready
} else {
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            setupNavbarBurger();
            setupNavbarDropdown();
            setupMobileMenu();
        }
    };
}
