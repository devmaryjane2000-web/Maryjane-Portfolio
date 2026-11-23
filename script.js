```javascript
// ==============================================
// DEV MARYJANE PORTFOLIO
// COMPLETE RESPONSIVE JAVASCRIPT
// ==============================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. SELECT WEBSITE ELEMENTS
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const siteHeader = document.getElementById("siteHeader");
    const currentYear = document.getElementById("currentYear");


    // ==========================================
    // 2. AUTOMATIC COPYRIGHT YEAR
    // ==========================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 3. MOBILE NAVIGATION
    // ==========================================

    function openMenu() {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute("aria-label", "Close navigation menu");

        const menuIcon = menuToggle.querySelector(".menu-icon");

        if (menuIcon) {
            menuIcon.textContent = "✕";
        }
    }


    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation menu");

        const menuIcon = menuToggle.querySelector(".menu-icon");

        if (menuIcon) {
            menuIcon.textContent = "☰";
        }
    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // Close menu after clicking a navigation link

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        // Close menu when clicking outside it

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMenu();
            }

        });


        // Close menu when Escape is pressed

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    // ==========================================
    // 4. CLOSE MOBILE MENU WHEN SCREEN EXPANDS
    // ==========================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });


    // ==========================================
    // 5. HEADER SCROLL EFFECT
    // ==========================================

    function updateHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 50) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // ==========================================
    // 6. SMOOTH SCROLLING
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            closeMenu();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ==========================================
    // 7. SECTION REVEAL ANIMATIONS
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".section-heading, .skill-card, .project-card, .service-card, .pricing-card, .about-card, .contact-message"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        animatedElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // ==========================================
    // 8. PRICING BUTTON CHECK
    // ==========================================

    const pricingButtons = document.querySelectorAll(
        ".pricing-card .email-link"
    );


    pricingButtons.forEach(button => {

        button.addEventListener("click", event => {

            const destination = button.getAttribute("href");

            if (!destination ||
                !destination.startsWith("https://mail.google.com/")) {

                event.preventDefault();

                console.error(
                    "The pricing button does not have a valid Gmail link."
                );

            }

        });

    });


    // ==========================================
    // 9. CONTACT BUTTON CHECK
    // ==========================================

    const contactButtons = document.querySelectorAll(
        ".email-link"
    );


    contactButtons.forEach(button => {

        button.addEventListener("click", () => {

            console.log(
                "Gmail contact button clicked successfully."
            );

        });

    });


    // ==========================================
    // 10. NAVIGATION ACTIVE SECTION
    // ==========================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentSection = entry.target.id;

                        navigationLinks.forEach(link => {

                            const linkTarget =
                                link.getAttribute("href");

                            if (linkTarget === "#" + currentSection) {

                                link.classList.add("active");

                            } else {

                                link.classList.remove("active");

                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );


        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // ==========================================
    // 11. PREVENT EMPTY NAVIGATION ERRORS
    // ==========================================

    document.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href || href.trim() === "") {

            link.setAttribute("href", "#home");

        }

    });


    // ==========================================
    // 12. WEBSITE READY
    // ==========================================

    console.log(
        "Dev Maryjane Portfolio loaded successfully!"
    );

});
```