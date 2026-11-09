    /* ===== EDIT THESE ===== */
const WEDDING = new Date("2026-11-19T17:00:00");
    const COUPLE = "أحمد و سميحة";
    /* ===================== */

    const $ = id => document.getElementById(id);

    // Opening: everything starts the moment the seal is tapped
    $("seal").addEventListener("click", () => {
      $("intro").classList.add("open");
      document.body.classList.remove("locked");
      $("hero").classList.add("go");
    }, { once: true });

    // Scroll cue: fades out once the guest scrolls, returns at the top
    const cue = $("scroll");
    addEventListener("scroll", () => cue.classList.toggle("hide", scrollY > 40), { passive: true });
    cue.addEventListener("click", () => scrollTo({ top: innerHeight, behavior: "smooth" }));

    // Countdown
    function tick() {
      const t = Math.max(0, WEDDING - Date.now()) / 1000;
      $("d").textContent = Math.floor(t / 86400);
      $("h").textContent = Math.floor(t % 86400 / 3600);
      $("m").textContent = Math.floor(t % 3600 / 60);
      $("s").textContent = Math.floor(t % 60);
    }
    tick(); setInterval(tick, 1000);
