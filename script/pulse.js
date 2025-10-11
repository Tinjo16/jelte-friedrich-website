  document.addEventListener("DOMContentLoaded", function () {
    const OFFSET = 100; // Höhe von z. B. Header
    const SCROLL_DURATION = 1000;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function smoothScrollToElement(target) {
      const start = window.pageYOffset;
      const end = target.getBoundingClientRect().top + start - OFFSET;
      const distance = end - start;
      const startTime = performance.now();

      function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);
        const ease = easeOutCubic(progress);
        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          // Nach dem Scroll: hervorheben
          target.classList.add('highlight');
          setTimeout(() => {
            target.classList.remove('highlight');
          }, 1500);
        }
      }

      requestAnimationFrame(scrollStep);
    }

    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // Startposition vor dem Browser-Jump wiederherstellen
        window.scrollTo(0, 0);
        setTimeout(() => {
          smoothScrollToElement(target);
        }, 300); // Warte, bis Seite komplett aufgebaut
      }
    }
  });
