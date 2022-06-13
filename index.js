
var carousels = document.getElementsByClassName("carousel-wrapper");
for (let i = 0; i < carousels.length; i++) {
    let carousel = carousels[i];
    let content = carousel.getElementsByClassName("carousel-content")[0];
    let maxPage = content.getElementsByTagName("img").length;
    let imageWidth = carousel.offsetWidth;
    let page = 1;

    /* Update item button */
    const updateItemButton = () => {
        for (let idx = 0; idx < maxPage; idx++) {
            let button = itemButtons[idx];
            if (idx + 1 == page) {
                button.classList.add("selected");
                continue;
            }
            button.classList.remove("selected");
        }
    };

    /* Change displayed image */
    const slideImage = (newPage) => {
        page = newPage < 1 ? maxPage : (newPage > maxPage ? 1 : newPage);
        content.style = `transform: translateX(-${(page - 1) * imageWidth}px);`;
        updateItemButton();
    };

    /* Auto slider */
    let timer;
    const autoSlide = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            slideImage(page + 1);
            autoSlide();
        }, 15000);
    };
    autoSlide();

    /* Create item button */
    let itemButtonWrapper = carousel.getElementsByClassName("carousel-item-buttons")[0];
    let itemButtons = {};
    for (let idx = 0; idx < maxPage; idx++) {
        let button = document.createElement("button");
        if (idx + 1 == page) button.classList.add("selected");

        button.addEventListener("click", () => {
            slideImage(idx + 1);
            autoSlide();
        })

        itemButtons[idx] = button;
        itemButtonWrapper.appendChild(button);
    }

    /* Prev button action */
    let prevButton = carousel.getElementsByClassName("carousel-prev")[0];
    prevButton.addEventListener("click", () => {
        slideImage(page - 1);
        autoSlide();
    });
    /* Next button action */
    let nextButton = carousel.getElementsByClassName("carousel-next")[0];
    nextButton.addEventListener("click", () => {
        slideImage(page + 1);
        autoSlide();
    });
}