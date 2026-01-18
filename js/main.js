document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {

  const openBtn = document.getElementById("openInvitation");
  const opening = document.getElementById("opening");
  const posterBox = document.getElementById("posterBox");
  const invitation = document.getElementById("invitation");
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  if (!openBtn || !posterBox || !bgMusic) return;

  const musicIcon = musicToggle.querySelector("i");
  let posterEntered = false;

  /* STEP 1 */
  openBtn.addEventListener("click", () => {
    opening.style.opacity = 0;
    setTimeout(() => {
      opening.style.display = "none";
      posterBox.classList.add("show");
    }, 600);
  });

  /* STEP 2 */
  function enterInvitation() {
    if (posterEntered) return;
    posterEntered = true;

    posterBox.style.opacity = 0;

    setTimeout(() => {
      posterBox.style.display = "none";
      invitation.classList.remove("hidden");
      startMusic();
      reveal(); // ✅ GANTI revealOnScroll → reveal
    }, 500);
  }

  posterBox.addEventListener("click", enterInvitation);
  window.addEventListener("wheel", enterInvitation, { passive: true });
  window.addEventListener("touchmove", enterInvitation, { passive: true });

  /* MUSIC */
  bgMusic.volume = 0.6;

  function startMusic() {
    bgMusic.play().then(() => {
      musicToggle.classList.add("playing");
      musicIcon.className = "fa-solid fa-volume-high";
    }).catch(() => {});
  }

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      startMusic();
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
      musicIcon.className = "fa-solid fa-volume-xmark";
    }
  });

  /* SCROLL REVEAL */
  window.reveal = function() {
  window.addEventListener('scroll', reveal);

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }
}

  /* FLIP CARD */
  const flipCards = document.querySelectorAll(".reveal-flip");

  const flipObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { threshold: 0.6 });

  flipCards.forEach(card => flipObserver.observe(card));

});

// COPY TEXT FUNCTION

// window.copyText = function (elementId) {
//   const el = document.getElementById(elementId);
//   if (!el) return;

//   navigator.clipboard.writeText(el.innerText).then(() => {
//     alert("Berhasil disalin ✅");
//   });
// };
window.copyText = function (elementId, btn) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const originalText = btn.innerText;

  navigator.clipboard.writeText(el.innerText).then(() => {
    btn.innerText = "Disalin ✓";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = originalText;
      btn.disabled = false;
    }, 2000);
  });
};



// Get Guest Name from URL

function getGuestTo() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to");
}

function capitalizeWords(str) {
  return str
    .replace(/\+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

document.addEventListener("DOMContentLoaded", () => {
  const guestEl = document.getElementById("guestTo");
  if (!guestEl) return;

  const guestTo = getGuestTo();

  if (guestTo) {
    guestEl.innerHTML = `Bapak/Ibu/Saudara/i <br> <strong>${capitalizeWords(guestTo)}</strong>`;
  } else {
    guestEl.innerHTML = "Bapak/Ibu/Saudara/i <br> yang kami hormati";
  }
});

