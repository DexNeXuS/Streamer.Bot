function toggleAccordion(id) {
    const content = document.getElementById(id);
    if (!content) return;
    const header = content.previousElementSibling;
    if (!header || !header.classList.contains('accordion-header')) return;
    const icon = header.querySelector('.accordion-icon');
    if (!icon) return;
    const isOpen = content.classList.contains('open');
    if (!isOpen) {
        content.classList.add('open');
        icon.setAttribute("data-icon", "ic:baseline-keyboard-arrow-down");
        const baseId = id.replace('-acc', '');
        history.pushState(null, null, `#${baseId}`);
        setTimeout(() => {
            const offset = 250;
            const elementPosition = header.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }, 100);
    } else {
        content.classList.remove('open');
        icon.setAttribute("data-icon", "ic:baseline-keyboard-arrow-right");
        history.pushState(null, null, window.location.pathname);
    }
}

// ====================================================================================================================
function copyToClipboard(id) {
    const copyText = document.getElementById(id);
    const button = copyText.nextElementSibling;
    navigator.clipboard.writeText(copyText.getAttribute("data-copy-text")).then(() => {
        button.innerHTML = '<span class="iconify" data-icon="fluent:checkmark-20-filled"></span> Copied';
        button.classList.add('copied');
        setTimeout(() => {
            button.innerHTML = '<span class="iconify" data-icon="material-symbols:content-copy-outline-sharp"></span> Copy';
            button.classList.remove('copied');
        }, 2500);
    });
}

// ====================================================================================================================
function copyURLToClipboard(url) {
    const button = document.querySelector('#browser-source-url-acc .copy-btn');
    navigator.clipboard.writeText(url).then(() => {
        button.innerHTML = '<span class="iconify" data-icon="fluent:checkmark-20-filled"></span> Copied';
        button.classList.add('copied');
        setTimeout(() => {
            button.innerHTML = '<span class="iconify" data-icon="material-symbols:content-copy-outline-sharp"></span> Copy';
            button.classList.remove('copied');
        }, 2500);
    });
}

// ====================================================================================================================
function loadImportString(file) {
    const importText = document.getElementById("import-string");
    if (!importText) return;
    fetch(file)
        .then(response => response.text())
        .then(data => {
            importText.textContent = data.substring(0, 200) + '...';
            importText.setAttribute("data-copy-text", data);
        })
        .catch(err => console.error("Error loading file:", err));
}

// ====================================================================================================================
document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const accId = `${hash}-acc`;
        toggleAccordion(accId);
        setTimeout(() => {
            const header = document.getElementById(accId)?.previousElementSibling;
            if (header) {
                const offset = 250;
                const elementPosition = header.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
            }
        }, 200);
    }
    
    const currentPage = window.location.pathname;
    const baseurl = "{{ site.baseurl }}".replace(/\/$/, '') || '';
    
    // Load action imports based on page
    if (currentPage.includes("dynamic-timers")) {
        loadImportString(baseurl + "/action-imports/dynamic-timers.txt");
    } else if (currentPage.includes("sample-timer")) {
        loadImportString(baseurl + "/action-imports/sample-timer.txt");
    } else if (currentPage.includes("ad-notification")) {
        loadImportString(baseurl + "/action-imports/ad-notification.txt");
    } else if (currentPage.includes("zelda-ocarina") || currentPage.includes("zelda")) {
        loadImportString(baseurl + "/action-imports/zelda-ocarina.txt");
    } else if (currentPage.includes("king-queen")) {
        loadImportString(baseurl + "/action-imports/king-queen.txt");
    }
});
