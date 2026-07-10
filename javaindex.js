document.addEventListener("DOMContentLoaded", () => {





    const slider = document.getElementById("alumniSlider");

    const slides = slider.children;

    const totalSlides = slides.length;

    let current = 0;

    function showSlide(index) {

        if (index < 0) index = totalSlides - 1;

        if (index >= totalSlides) index = 0;

        current = index;

        slider.style.transform = `translateX(-${current * 100}%)`;

    }

    document.getElementById("nextAlumni").addEventListener("click", () => {

        showSlide(current + 1);

        restartAuto();

    });

    document.getElementById("prevAlumni").addEventListener("click", () => {

        showSlide(current - 1);

        restartAuto();

    });

    let auto = setInterval(() => {

        showSlide(current + 1);

    }, 4000);

    function restartAuto() {

        clearInterval(auto);

        auto = setInterval(() => {

            showSlide(current + 1);

        }, 4000);

    }








    const canvas = document.getElementById("scroll-canvas");
    const context = canvas.getContext("2d");
    const scrollContainer = document.getElementById("scroll-container");
    const loader = document.getElementById("canvas-loader");


    // const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Detect mobile or portrait screen
    const isMobile =
        window.innerWidth <= 768 ||
        window.innerHeight > window.innerWidth;
    const frameCount = isMobile ? 155 : 288;
    const images = [];
    let loadedCount = 0;
    let animationFrameId = null;
    let lastFrameIndex = -1;

    // Frame URL constructor (1-indexed frames: ezgif-frame-001.jpg to ezgif-frame-288.jpg)
    const getFrameUrl = (index) => {
        const padded = String(index).padStart(3, "0");

        if (isMobile) {
            return `../frames mobile/mezgif-frame-${padded}.jpg`;
        }

        return `../frames/ezgif-frame-${padded}.jpg`;
    };

    // Render a specific image on the canvas matching cover aspect ratio
    const renderFrame = (img) => {
        if (!img) return;

        // Set canvas dimensions to match display dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        if (!imgWidth || !imgHeight) return;

        // Calculate scale factor for 'cover' fit
        const scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
        const x = (canvas.width / 2) - (imgWidth / 2) * scale;
        const y = (canvas.height / 2) - (imgHeight / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    // Text slides config with activation ranges
    const textSlides = [
        { id: "slide-1", start: 0.0, activeStart: 0.0, activeEnd: 0.20, end: 0.25 },
        { id: "slide-2", start: 0.25, activeStart: 0.28, activeEnd: 0.48, end: 0.53 },
        { id: "slide-3", start: 0.53, activeStart: 0.56, activeEnd: 0.76, end: 0.81 },
        { id: "slide-4", start: 0.81, activeStart: 0.85, activeEnd: 1.0, end: 1.0 }
    ];

    // Update text slide opacities based on scroll fraction
    const updateTextOverlays = (fraction) => {
        textSlides.forEach(slide => {
            const el = document.getElementById(slide.id);
            if (!el) return;

            let opacity = 0;
            if (fraction >= slide.start && fraction <= slide.end) {
                if (fraction < slide.activeStart) {
                    // Fade in
                    opacity = (fraction - slide.start) / (slide.activeStart - slide.start);
                } else if (fraction > slide.activeEnd) {
                    // Fade out (except for the last slide, which stays visible)
                    if (slide.end === 1.0 && slide.activeEnd === 1.0) {
                        opacity = 1;
                    } else if (slide.id === "slide-4") {
                        opacity = 1;
                    } else {
                        opacity = 1 - (fraction - slide.activeEnd) / (slide.end - slide.activeEnd);
                    }
                } else {
                    opacity = 1;
                }
            }

            el.style.opacity = opacity;
            // Fade/slide effect: slightly slide up as it fades in
            const translateY = (1 - opacity) * 20;
            el.style.transform = `translateY(${translateY}px)`;

            // Control pointer events: only enable clicks on the active interactive slide (slide 4)
            if (opacity > 0.5 && slide.id === "slide-4") {
                el.style.pointerEvents = "auto";
            } else {
                el.style.pointerEvents = "none";
            }
        });
    };

    // Main tick function to sync frame drawing and text overlays
    const tick = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const containerTop = scrollContainer.offsetTop;
        const containerHeight = scrollContainer.offsetHeight;
        const windowHeight = window.innerHeight;

        const relativeScroll = scrollTop - containerTop;
        const maxScroll = containerHeight - windowHeight;

        let fraction = 0;
        if (relativeScroll > 0) {
            fraction = Math.min(1.0, relativeScroll / maxScroll);
        }

        // Map fraction [0.0 - 1.0] to frame [0 - 287]
        const frameIndex = Math.min(frameCount - 1, Math.floor(fraction * frameCount));

        // Only redraw if frame index has changed
        if (frameIndex !== lastFrameIndex) {
            const img = images[frameIndex];
            if (img && img.complete) {
                renderFrame(img);
                lastFrameIndex = frameIndex;
            }
        }

        updateTextOverlays(fraction);
    };

    // Throttled scroll listener using requestAnimationFrame
    const onScroll = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(tick);
    };

    // Handle window resizing
    const onResize = () => {
        if (lastFrameIndex >= 0) {
            renderFrame(images[lastFrameIndex]);
        }
    };

    // Start preloading images
    let firstFrameRendered = false;
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
            loadedCount++;

            // Render first frame as soon as it's ready to avoid layout shift
            if (i === 1 && !firstFrameRendered) {
                renderFrame(img);
                firstFrameRendered = true;
                lastFrameIndex = 0;
                updateTextOverlays(0);
                // Hide loader early once first frame is available
                if (loader) {
                    loader.classList.add("opacity-0");
                    setTimeout(() => loader.remove(), 500);
                }
            }

            // If scroll position is already down the page when loaded, render appropriate frame
            if (loadedCount === frameCount) {
                tick();
            }
        };
        images.push(img);
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
});





