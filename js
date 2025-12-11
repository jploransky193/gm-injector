(function () {
    function injectIcons() {
        const label = [...document.querySelectorAll("div.label")]
            .find(el => el.innerText.trim().toLowerCase() === "street address");

        if (!label) return;
        if (document.getElementById("sl-address-icons")) return;

        const input = document.querySelector('input[name="contact.address1"]');
        if (!input) return;

        const iconWrap = document.createElement("span");
        iconWrap.id = "sl-address-icons";
        iconWrap.style.marginLeft = "12px";
        iconWrap.style.display = "inline-flex";
        iconWrap.style.gap = "10px";
        iconWrap.style.verticalAlign = "middle";

        function createIcon(src, urlBase) {
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "20px";
            img.style.cursor = "pointer";
            img.onclick = () => {
                const address = encodeURIComponent(input.value.trim());
                if (address) window.open(urlBase + address, "_blank");
            };
            return img;
        }

        iconWrap.appendChild(createIcon(
            "https://www.zillowstatic.com/static/logos/z-logo-default.svg",
            "https://www.zillow.com/homes/"
        ));

        iconWrap.appendChild(createIcon(
            "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
            "https://www.google.com/maps/place/"
        ));

        label.appendChild(iconWrap);
    }

    const observer = new MutationObserver(injectIcons);
    observer.observe(document.body, { childList: true, subtree: true });

    injectIcons();
})();
