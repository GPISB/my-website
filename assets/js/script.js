/* ==========================================================
   GP DIGITAL v1.0
   WEBSITE JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navbar =
        document.querySelector(".navbar");

    const navbarCollapse =
        document.querySelector(".navbar-collapse");

    const navLinks =
        document.querySelectorAll(".navbar-nav .nav-link");

    const heroSlides =
        document.querySelectorAll(".hero-slide");


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

    window.addEventListener(
        "scroll",
        updateNavbar
    );


    /* ======================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ====================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (!navbarCollapse) {
                return;
            }

            if (
                navbarCollapse.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {

                const bootstrapCollapse =
                    bootstrap.Collapse.getOrCreateInstance(
                        navbarCollapse
                    );

                bootstrapCollapse.hide();

            }

        });

    });


    /* ======================================================
       ACTIVE NAVIGATION LINK
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
       ROTATING HERO BACKGROUND
    ====================================================== */

    if (heroSlides.length > 1) {

        let currentSlide = 0;

        window.setInterval(function () {

            heroSlides[currentSlide]
                .classList.remove("active");

            currentSlide =
                (currentSlide + 1) % heroSlides.length;

            heroSlides[currentSlide]
                .classList.add("active");

        }, 6500);

    }

});
/* =========================================================
   GP DIGITAL — PRODUCTS PAGE
   PRODUCT FILTERS AND QUOTATION BASKET
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CHECK WHETHER THIS IS THE PRODUCTS PAGE
    ===================================================== */

    const productFilters = document.querySelectorAll(".product-filter");
    const productItems = document.querySelectorAll(".product-item");
    const addToQuoteButtons = document.querySelectorAll(".add-to-quote");

    const quoteBasket = document.getElementById("quoteBasket");
    const quoteBasketToggle = document.getElementById("quoteBasketToggle");
    const quoteBasketClose = document.getElementById("quoteBasketClose");
    const quoteBasketItems = document.getElementById("quoteBasketItems");
    const quoteBasketCount = document.getElementById("quoteBasketCount");
    const clearQuoteBasket = document.getElementById("clearQuoteBasket");
    const sendQuoteWhatsApp = document.getElementById("sendQuoteWhatsApp");

    if (
        !quoteBasket ||
        !quoteBasketToggle ||
        !quoteBasketItems ||
        !quoteBasketCount
    ) {
        return;
    }


    /* =====================================================
       PRODUCT CATEGORY FILTERING
    ===================================================== */

    productFilters.forEach(function (filterButton) {

        filterButton.addEventListener("click", function () {

            const selectedFilter = filterButton.dataset.filter;

            productFilters.forEach(function (button) {
                button.classList.remove("active");
            });

            filterButton.classList.add("active");

            productItems.forEach(function (productItem) {

                const productCategories =
                    productItem.dataset.category
                        ? productItem.dataset.category.split(" ")
                        : [];

                const shouldDisplay =
                    selectedFilter === "all" ||
                    productCategories.includes(selectedFilter);

                if (shouldDisplay) {

                    productItem.classList.remove("product-hidden");
                    productItem.classList.add("product-visible");

                    window.setTimeout(function () {
                        productItem.classList.remove("product-visible");
                    }, 450);

                } else {

                    productItem.classList.add("product-hidden");
                    productItem.classList.remove("product-visible");

                }

            });

        });

    });


    /* =====================================================
       QUOTATION BASKET DATA
    ===================================================== */

    const quotationStorageKey = "gpIntegrasiQuotationBasket";

    let quotationBasket = loadQuotationBasket();


    function loadQuotationBasket() {

        try {

            const storedBasket =
                localStorage.getItem(quotationStorageKey);

            if (!storedBasket) {
                return [];
            }

            const parsedBasket = JSON.parse(storedBasket);

            return Array.isArray(parsedBasket)
                ? parsedBasket
                : [];

        } catch (error) {

            console.error(
                "Unable to load quotation basket:",
                error
            );

            return [];

        }

    }


    function saveQuotationBasket() {

        try {

            localStorage.setItem(
                quotationStorageKey,
                JSON.stringify(quotationBasket)
            );

        } catch (error) {

            console.error(
                "Unable to save quotation basket:",
                error
            );

        }

    }


    /* =====================================================
       QUOTATION BASKET BACKDROP
    ===================================================== */

    const quoteBasketBackdrop = document.createElement("div");

    quoteBasketBackdrop.className = "quote-basket-backdrop";

    document.body.appendChild(quoteBasketBackdrop);


    /* =====================================================
       OPEN AND CLOSE QUOTATION BASKET
    ===================================================== */

    function openQuotationBasket() {

        quoteBasket.classList.add("open");
        quoteBasketBackdrop.classList.add("active");
        document.body.classList.add("quote-basket-open");

        quoteBasketToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeQuotationBasket() {

        quoteBasket.classList.remove("open");
        quoteBasketBackdrop.classList.remove("active");
        document.body.classList.remove("quote-basket-open");

        quoteBasketToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    quoteBasketToggle.addEventListener(
        "click",
        openQuotationBasket
    );


    if (quoteBasketClose) {

        quoteBasketClose.addEventListener(
            "click",
            closeQuotationBasket
        );

    }


    quoteBasketBackdrop.addEventListener(
        "click",
        closeQuotationBasket
    );


    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            quoteBasket.classList.contains("open")
        ) {
            closeQuotationBasket();
        }

    });


    /* =====================================================
       ADD PRODUCT TO QUOTATION BASKET
    ===================================================== */

    addToQuoteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName = button.dataset.product;
            const productPrice = button.dataset.price;

            if (!productName) {
                return;
            }

            const existingProduct = quotationBasket.find(
                function (product) {
                    return product.name === productName;
                }
            );

            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                quotationBasket.push({
                    name: productName,
                    price: productPrice || "Price on Request",
                    quantity: 1
                });

            }

            saveQuotationBasket();
            renderQuotationBasket();
            updateAddToQuoteButtons();

            button.classList.add("added");

            const originalButtonContent =
                button.innerHTML;

            button.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                Added To Quote
            `;

            window.setTimeout(function () {

                button.innerHTML = originalButtonContent;

            }, 1200);

            openQuotationBasket();

        });

    });


    /* =====================================================
       DISPLAY QUOTATION BASKET
    ===================================================== */

    function renderQuotationBasket() {

        quoteBasketItems.innerHTML = "";

        if (quotationBasket.length === 0) {

            quoteBasketItems.innerHTML = `
                <p class="quote-basket-empty">
                    No products have been added yet.
                    Browse the catalogue and select
                    “Add To Quote” to prepare your enquiry.
                </p>
            `;

            quoteBasketCount.textContent = "0";

            updateAddToQuoteButtons();

            return;

        }

        quotationBasket.forEach(function (product, index) {

            const quotationItem =
                document.createElement("div");

            quotationItem.className = "quote-basket-item";

            quotationItem.innerHTML = `
                <div class="quote-basket-item-details">

                    <h4>
                        ${escapeHTML(product.name)}
                    </h4>

                    <span>
                        ${escapeHTML(product.price)}
                    </span>

                    <div class="quote-item-quantity">

                        <button
                            type="button"
                            class="quote-quantity-btn decrease-quantity"
                            data-index="${index}"
                            aria-label="Decrease quantity for ${escapeHTML(product.name)}"
                        >
                            <i class="bi bi-dash-lg"></i>
                        </button>

                        <strong>
                            ${product.quantity}
                        </strong>

                        <button
                            type="button"
                            class="quote-quantity-btn increase-quantity"
                            data-index="${index}"
                            aria-label="Increase quantity for ${escapeHTML(product.name)}"
                        >
                            <i class="bi bi-plus-lg"></i>
                        </button>

                    </div>

                </div>

                <button
                    type="button"
                    class="quote-remove-item"
                    data-index="${index}"
                    aria-label="Remove ${escapeHTML(product.name)} from quotation list"
                >
                    <i class="bi bi-trash3-fill"></i>
                </button>
            `;

            quoteBasketItems.appendChild(quotationItem);

        });

        updateQuotationCount();
        attachQuotationItemEvents();
        updateAddToQuoteButtons();

    }


    /* =====================================================
       QUOTATION ITEM BUTTON EVENTS
    ===================================================== */

    function attachQuotationItemEvents() {

        const increaseButtons =
            quoteBasketItems.querySelectorAll(
                ".increase-quantity"
            );

        const decreaseButtons =
            quoteBasketItems.querySelectorAll(
                ".decrease-quantity"
            );

        const removeButtons =
            quoteBasketItems.querySelectorAll(
                ".quote-remove-item"
            );


        increaseButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const productIndex =
                    Number(button.dataset.index);

                if (!quotationBasket[productIndex]) {
                    return;
                }

                quotationBasket[productIndex].quantity += 1;

                saveQuotationBasket();
                renderQuotationBasket();

            });

        });


        decreaseButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const productIndex =
                    Number(button.dataset.index);

                if (!quotationBasket[productIndex]) {
                    return;
                }

                if (
                    quotationBasket[productIndex].quantity > 1
                ) {

                    quotationBasket[productIndex].quantity -= 1;

                } else {

                    quotationBasket.splice(productIndex, 1);

                }

                saveQuotationBasket();
                renderQuotationBasket();

            });

        });


        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const productIndex =
                    Number(button.dataset.index);

                if (!quotationBasket[productIndex]) {
                    return;
                }

                quotationBasket.splice(productIndex, 1);

                saveQuotationBasket();
                renderQuotationBasket();

            });

        });

    }


    /* =====================================================
       UPDATE TOTAL QUANTITY
    ===================================================== */

    function updateQuotationCount() {

        const totalQuantity =
            quotationBasket.reduce(
                function (total, product) {

                    return total + product.quantity;

                },
                0
            );

        quoteBasketCount.textContent =
            totalQuantity.toString();

    }


    /* =====================================================
       UPDATE ADD TO QUOTE BUTTON APPEARANCE
    ===================================================== */

    function updateAddToQuoteButtons() {

        addToQuoteButtons.forEach(function (button) {

            const productName =
                button.dataset.product;

            const productExists =
                quotationBasket.some(
                    function (product) {
                        return product.name === productName;
                    }
                );

            if (productExists) {

                button.classList.add("added");

            } else {

                button.classList.remove("added");

            }

        });

    }


    /* =====================================================
       CLEAR ENTIRE QUOTATION BASKET
    ===================================================== */

    if (clearQuoteBasket) {

        clearQuoteBasket.addEventListener(
            "click",
            function () {

                if (quotationBasket.length === 0) {
                    return;
                }

                const shouldClear =
                    window.confirm(
                        "Remove all products from your quotation list?"
                    );

                if (!shouldClear) {
                    return;
                }

                quotationBasket = [];

                saveQuotationBasket();
                renderQuotationBasket();

            }
        );

    }


    /* =====================================================
       SEND QUOTATION REQUEST THROUGH WHATSAPP
    ===================================================== */

    if (sendQuoteWhatsApp) {

        sendQuoteWhatsApp.addEventListener(
            "click",
            function () {

                if (quotationBasket.length === 0) {

                    window.alert(
                        "Please add at least one product to your quotation list."
                    );

                    return;

                }

                const whatsappNumber = "601175267647";

                const quotationLines =
                    quotationBasket.map(
                        function (product, index) {

                            return (
                                `${index + 1}. ` +
                                `${product.quantity} × ` +
                                `${product.name} ` +
                                `(${product.price})`
                            );

                        }
                    );

                const whatsappMessage = [
                    "Hello GP Integrasi,",
                    "",
                    "I would like to request a quotation for the following products:",
                    "",
                    ...quotationLines,
                    "",
                    "Please confirm the available brands, specifications, delivery charges and installation cost where applicable.",
                    "",
                    "Name:",
                    "Company / Organisation:",
                    "Delivery Location:",
                    "Required Date:",
                    "",
                    "Thank you."
                ].join("\n");

                const whatsappURL =
                    `https://wa.me/${whatsappNumber}` +
                    `?text=${encodeURIComponent(whatsappMessage)}`;

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       SAFE TEXT OUTPUT
    ===================================================== */

    function escapeHTML(value) {

        const temporaryElement =
            document.createElement("div");

        temporaryElement.textContent =
            String(value);

        return temporaryElement.innerHTML;

    }


    /* =====================================================
       INITIALISE PRODUCT PAGE
    ===================================================== */

    quoteBasketToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    renderQuotationBasket();

});
/* =========================================================
   GP DIGITAL — PROJECT PAGE FILTERS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const projectFilters =
        document.querySelectorAll(".project-filter");

    const projectItems =
        document.querySelectorAll(".project-item");

    if (
        projectFilters.length === 0 ||
        projectItems.length === 0
    ) {
        return;
    }

    projectFilters.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.dataset.filter;

            projectFilters.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");

            projectItems.forEach(function (project) {

                const categories =
                    project.dataset.category
                        ? project.dataset.category.split(" ")
                        : [];

                const shouldShow =
                    selectedCategory === "all" ||
                    categories.includes(selectedCategory);

                if (shouldShow) {

                    project.classList.remove(
                        "project-hidden"
                    );

                    project.classList.add(
                        "project-visible"
                    );

                    window.setTimeout(function () {

                        project.classList.remove(
                            "project-visible"
                        );

                    }, 450);

                } else {

                    project.classList.add(
                        "project-hidden"
                    );

                    project.classList.remove(
                        "project-visible"
                    );

                }

            });

        });

    });

});
/* =========================================================
   GP DIGITAL — CONTACT ENQUIRY FORM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactEnquiryForm");

    if (!contactForm) {
        return;
    }


    const nameInput =
        document.getElementById("contactName");

    const companyInput =
        document.getElementById("contactCompany");

    const phoneInput =
        document.getElementById("contactPhone");

    const emailInput =
        document.getElementById("contactEmail");

    const categoryInput =
        document.getElementById("contactCategory");

    const locationInput =
        document.getElementById("contactLocation");

    const timelineInput =
        document.getElementById("contactTimeline");

    const messageInput =
        document.getElementById("contactMessage");


    const requiredFields = [
        nameInput,
        phoneInput,
        categoryInput,
        locationInput,
        messageInput
    ];


    function removeValidationState(field) {

        field.classList.remove("is-invalid");
        field.classList.remove("is-valid");

    }


    function validateRequiredField(field) {

        const fieldValue = field.value.trim();

        if (fieldValue === "") {

            field.classList.add("is-invalid");
            field.classList.remove("is-valid");

            return false;

        }

        field.classList.remove("is-invalid");
        field.classList.add("is-valid");

        return true;

    }


    function validateEmail(field) {

        const emailValue = field.value.trim();

        if (emailValue === "") {

            removeValidationState(field);

            return true;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            field.classList.add("is-invalid");
            field.classList.remove("is-valid");

            return false;

        }

        field.classList.remove("is-invalid");
        field.classList.add("is-valid");

        return true;

    }


    function validatePhone(field) {

        const phoneValue =
            field.value.trim();

        const cleanedPhone =
            phoneValue.replace(/[\s\-()]/g, "");

        const phonePattern =
            /^\+?[0-9]{8,15}$/;

        if (!phonePattern.test(cleanedPhone)) {

            field.classList.add("is-invalid");
            field.classList.remove("is-valid");

            return false;

        }

        field.classList.remove("is-invalid");
        field.classList.add("is-valid");

        return true;

    }


    requiredFields.forEach(function (field) {

        field.addEventListener("input", function () {

            validateRequiredField(field);

        });

        field.addEventListener("change", function () {

            validateRequiredField(field);

        });

    });


    emailInput.addEventListener("input", function () {

        validateEmail(emailInput);

    });


    phoneInput.addEventListener("input", function () {

        validatePhone(phoneInput);

    });


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        let formIsValid = true;


        requiredFields.forEach(function (field) {

            const fieldIsValid =
                validateRequiredField(field);

            if (!fieldIsValid) {

                formIsValid = false;

            }

        });


        if (!validatePhone(phoneInput)) {

            formIsValid = false;

        }


        if (!validateEmail(emailInput)) {

            formIsValid = false;

        }


        if (!formIsValid) {

            const firstInvalidField =
                contactForm.querySelector(".is-invalid");

            if (firstInvalidField) {

                firstInvalidField.focus();

                firstInvalidField.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            return;

        }


        const name =
            nameInput.value.trim();

        const company =
            companyInput.value.trim() || "Not provided";

        const phone =
            phoneInput.value.trim();

        const email =
            emailInput.value.trim() || "Not provided";

        const category =
            categoryInput.value;

        const projectLocation =
            locationInput.value.trim();

        const timeline =
            timelineInput.value || "Not specified";

        const projectDescription =
            messageInput.value.trim();


        const whatsappMessage = [
            "Hello GP Integrasi,",
            "",
            "I would like to submit a project or service enquiry.",
            "",
            "*CONTACT DETAILS*",
            "Name: " + name,
            "Company: " + company,
            "Contact Number: " + phone,
            "Email: " + email,
            "",
            "*PROJECT INFORMATION*",
            "Enquiry Category: " + category,
            "Project Location: " + projectLocation,
            "Expected Timeline: " + timeline,
            "",
            "*PROJECT DESCRIPTION*",
            projectDescription,
            "",
            "Please let me know if you require any drawings, BQ, specifications or photographs.",
            "",
            "Thank you."
        ].join("\n");


        const whatsappNumber =
            "601175267647";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
/* =========================================================
   GP DIGITAL — COPY EMAIL FEATURE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const copyEmailButton =
        document.getElementById("copyEmailButton");

    const emailAddress =
        document.getElementById("contactEmailAddress");

    if (!copyEmailButton || !emailAddress) {
        return;
    }


    function showCopyNotification() {

        let notification =
            document.querySelector(".contact-copy-notification");

        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "contact-copy-notification";

            notification.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                <span>Email address copied!</span>
            `;

            document.body.appendChild(notification);

        }


        notification.classList.add("show");


        window.setTimeout(function () {

            notification.classList.remove("show");

        }, 2200);

    }


    function updateCopyButton() {

        const buttonIcon =
            copyEmailButton.querySelector("i");

        const buttonText =
            copyEmailButton.querySelector("span");

        copyEmailButton.classList.add("copied");

        if (buttonIcon) {

            buttonIcon.className =
                "bi bi-check-lg";

        }

        if (buttonText) {

            buttonText.textContent =
                "Copied";

        }


        window.setTimeout(function () {

            copyEmailButton.classList.remove("copied");

            if (buttonIcon) {

                buttonIcon.className =
                    "bi bi-copy";

            }

            if (buttonText) {

                buttonText.textContent =
                    "Copy";

            }

        }, 2200);

    }


    async function copyEmailAddress() {

        const emailText =
            emailAddress.textContent.trim();

        try {

            await navigator.clipboard.writeText(emailText);

            showCopyNotification();
            updateCopyButton();

        } catch (error) {

            const temporaryInput =
                document.createElement("textarea");

            temporaryInput.value =
                emailText;

            temporaryInput.setAttribute(
                "readonly",
                ""
            );

            temporaryInput.style.position =
                "fixed";

            temporaryInput.style.opacity =
                "0";

            document.body.appendChild(
                temporaryInput
            );

            temporaryInput.select();

            document.execCommand("copy");

            document.body.removeChild(
                temporaryInput
            );

            showCopyNotification();
            updateCopyButton();

        }

    }


    copyEmailButton.addEventListener(
        "click",
        copyEmailAddress
    );

});