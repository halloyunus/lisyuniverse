// Guestbook Form Submission and Loading Wishes
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("guestForm");
  const list = document.getElementById("guestList");

  if (!form || !list) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = guestName.value.trim();
    const message = guestMessage.value.trim();

    if (!name || !message) {
      showToast("Nama dan ucapan wajib diisi", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);

    try {
      const res = await fetch("api/save-wish.php", {
        method: "POST",
        body: formData
      });

      const text = await res.text();

      if (text.trim().toLowerCase() === "success") {
        form.reset();
        loadWishes();

        showToast("Ucapan berhasil dikirim ❤️", "success");
      } else {
        showToast("Gagal menyimpan ucapan 😢", "error");
      }

    } catch (err) {
      console.error(err);
      showToast("Terjadi kesalahan server", "error");
    }
  });

  async function loadWishes() {
    const res = await fetch("api/get-wishes.php");
    const data = await res.json();

    list.innerHTML = "";

    data.forEach(item => {
      list.innerHTML += `
        <div class="guest-item reveal up">
          <span class="guest-name">${item.name}</span>
          <p class="guest-message">${item.message}</p>
        </div>
      `;
    });

    reveal();
  }

  list.addEventListener("scroll", reveal);

  loadWishes();
});



// RSVP Form Submission

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = rsvpName.value.trim();
  const attendance = rsvpAttendance.value;
  const guests = rsvpGuests.value;

  if (!name || !attendance) {
    showToast("Nama & konfirmasi wajib diisi", "error");
    return;
  }

  const data = new FormData();
  data.append("name", name);
  data.append("attendance", attendance);
  data.append("guests", guests);

  fetch("api/save-rsvp.php", {
    method: "POST",
    body: data
  })
    .then(res => res.text())
    .then(res => {
      if (res.trim() === "success") {

        bootstrap.Modal.getInstance(
          document.getElementById("rsvpModal")
        ).hide();

        rsvpForm.reset();
        showToast("Konfirmasi berhasil❤️", "success");

      } else {
        showToast("Gagal menyimpan RSVP 😢", "error");
      }
    })
    .catch(() => {
      showToast("Server error, coba lagi", "error");
    });
});


// RSVP Form Logic: Disable Guests if Not Attending

const attendanceSelect = document.getElementById("rsvpAttendance");
const guestsSelect = document.getElementById("rsvpGuests");

attendanceSelect.addEventListener("change", () => {
  if (attendanceSelect.value === "Tidak Hadir") {
    guestsSelect.value = 0;
    guestsSelect.disabled = true;
  } else {
    guestsSelect.disabled = false;
  }
});

// Toast Notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `nf-toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

