/* ==========================================================
   GP DIGITAL v1.0
   HOMEPAGE JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");


    /* ======================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);


    /* ======================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ====================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (!navbarCollapse) {
                return;
            }

            if (navbarCollapse.classList.contains("show")) {

                const bootstrapCollapse =
                    bootstrap.Collapse.getOrCreateInstance(
                        navbarCollapse
                    );

                bootstrapCollapse.hide();

            }

        });

    });


    /* ======================================================
       ACTIVE MENU LINK
    ====================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* ======================================================
       EXTERNAL WHATSAPP LINK SAFETY
    ====================================================== */

    const whatsappButton =
        document.querySelector(".whatsapp-button");

    if (whatsappButton) {

        whatsappButton.addEventListener("click", function () {

            console.log(
                "Opening GP Integrasi WhatsApp enquiry."
            );

        });

    }

});