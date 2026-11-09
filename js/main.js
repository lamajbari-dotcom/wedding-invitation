    /* ===== EDIT THESE ===== */
    const WEDDING = new Date("2027-06-12T16:00:00");
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

    // Add to calendar
    const pad = n => String(n).padStart(2, "0");
    const fmt = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    $("cal").href = "data:text/calendar;charset=utf-8," + encodeURIComponent(
      `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:عقد قران ${COUPLE}\nDTSTART:${fmt(WEDDING)}\nDTEND:${fmt(new Date(WEDDING.getTime() + 8 * 3600e3))}\nEND:VEVENT\nEND:VCALENDAR`);

    // RSVP (front-end only for now)
    $("form").addEventListener("submit", e => {
      e.preventDefault();
      const f = new FormData(e.target);
      $("thanks").textContent = f.get("att") === "yes"
        ? `شكرًا ${f.get("name")}. نتطلع إلى مشاركتكم فرحتنا.`
        : `شكرًا ${f.get("name")}. سنفتقدكم.`;
      $("thanks").style.display = "block";
      e.target.style.display = "none";
    });
