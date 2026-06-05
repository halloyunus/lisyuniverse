// Guestbook Form Submission and Loading Wishes
// document.addEventListener("DOMContentLoaded", () => {

//   const form = document.getElementById("guestForm");
//   const list = document.getElementById("guestList");

//   if (!form || !list) return;

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = guestName.value.trim();
//     const message = guestMessage.value.trim();

//     if (!name || !message) {
//       showToast("Nama dan ucapan wajib diisi", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("message", message);

//     try {
//       const res = await fetch("api/save-wish.php", {
//         method: "POST",
//         body: formData
//       });

//       const text = await res.text();

//       if (text.trim().toLowerCase() === "success") {
//         form.reset();
//         loadWishes();

//         showToast("Ucapan berhasil dikirim ❤️", "success");
//       } else {
//         showToast("Gagal menyimpan ucapan 😢", "error");
//       }

//     } catch (err) {
//       console.error(err);
//       showToast("Terjadi kesalahan server", "error");
//     }
//   });

//   async function loadWishes() {
//     const res = await fetch("api/get-wishes.php");
//     const data = await res.json();

//     list.innerHTML = "";

//     data.forEach(item => {
//       list.innerHTML += `
//         <div class="guest-item reveal up">
//           <span class="guest-name">${item.name}</span>
//           <p class="guest-message">${item.message}</p>
//         </div>
//       `;
//     });

//     reveal();
//   }

//   list.addEventListener("scroll", reveal);

//   loadWishes();
// });



// // RSVP Form Submission

// const rsvpForm = document.getElementById("rsvpForm");

// rsvpForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = rsvpName.value.trim();
//   const attendance = rsvpAttendance.value;
//   const guests = rsvpGuests.value;

//   if (!name || !attendance) {
//     showToast("Nama & konfirmasi wajib diisi", "error");
//     return;
//   }

//   const data = new FormData();
//   data.append("name", name);
//   data.append("attendance", attendance);
//   data.append("guests", guests);

//   fetch("api/save-rsvp.php", {
//     method: "POST",
//     body: data
//   })
//     .then(res => res.text())
//     .then(res => {
//       if (res.trim() === "success") {

//         bootstrap.Modal.getInstance(
//           document.getElementById("rsvpModal")
//         ).hide();

//         rsvpForm.reset();
//         showToast("Konfirmasi berhasil❤️", "success");

//       } else {
//         showToast("Gagal menyimpan RSVP 😢", "error");
//       }
//     })
//     .catch(() => {
//       showToast("Server error, coba lagi", "error");
//     });
// });


// // RSVP Form Logic: Disable Guests if Not Attending

// const attendanceSelect = document.getElementById("rsvpAttendance");
// const guestsSelect = document.getElementById("rsvpGuests");

// attendanceSelect.addEventListener("change", () => {
//   if (attendanceSelect.value === "Tidak Hadir") {
//     guestsSelect.value = 0;
//     guestsSelect.disabled = true;
//   } else {
//     guestsSelect.disabled = false;
//   }
// });

// // Toast Notification
// function showToast(message, type = "success") {
//   const toast = document.getElementById("toast");
//   toast.textContent = message;
//   toast.className = `nf-toast show ${type}`;

//   setTimeout(() => {
//     toast.classList.remove("show");
//   }, 3000);
// }
// +++++++++++++ END COMMENT BEFORE UPDATE +++++++++++++++++++++

// // ++++++++++++ BEGIN UPDATE KE 2 WHISES & PRAYERS DISPLAY +++++++++++++++
// // =========================================================================
// // CONFIGURATION & TIME VALIDATION
// // =========================================================================

// // Tentukan tanggal target acara Anda (Format: YYYY-MM-DDTHH:mm:ss)
// const TARGET_DATE = new Date("2026-03-26T08:00:00").getTime();

// // Fungsi global untuk mengecek apakah waktu sudah melewati target (Expired)
// function isCountdownExpired() {
//   const now = new Date().getTime();
//   return now > TARGET_DATE;
// }

// // =========================================================================
// // GUESTBOOK & WISHES LOGIC (DOMContentLoaded)
// // =========================================================================
// document.addEventListener("DOMContentLoaded", () => {

//   const form = document.getElementById("guestForm");
//   const list = document.getElementById("guestList");

//   if (!form || !list) return;

//   // SYSTEM AUTO-LOCK: Jika waktu countdown sudah terlewati
//   if (isCountdownExpired()) {
//     // 1. Kunci tombol submit dan ubah teksnya sesuai request
//     const submitBtn = form.querySelector("button[type='submit']");
//     if (submitBtn) {
//       submitBtn.disabled = true;
//       submitBtn.innerText = "Wishes & Prayers Closed";
//     }
    
//     // 2. Kunci semua field input agar tidak bisa diketik sama sekali
//     form.querySelectorAll("input, textarea").forEach(el => el.disabled = true);
//   }

//   // Handle Submit Form Ucapan
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     // Proteksi ganda jika user mencoba tembus lewat inspect element
//     if (isCountdownExpired()) {
//       showToast("Mohon maaf, periode pengiriman ucapan sudah berakhir 🙏", "error");
//       return;
//     }

//     const name = guestName.value.trim();
//     const message = guestMessage.value.trim();

//     if (!name || !message) {
//       showToast("Nama dan ucapan wajib diisi", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("message", message);

//     try {
//       const res = await fetch("api/save-wish.php", {
//         method: "POST",
//         body: formData
//       });

//       const text = await res.text();

//       if (text.trim().toLowerCase() === "success") {
//         form.reset();
//         loadWishes();
//         showToast("Ucapan berhasil dikirim ❤️", "success");
//       } else {
//         showToast("Gagal menyimpan ucapan 😢", "error");
//       }

//     } catch (err) {
//       console.error(err);
//       showToast("Terjadi kesalahan server", "error");
//     }
//   });

//   // Handle Ambil Data Ucapan
//   async function loadWishes() {
//     const res = await fetch("api/get-wishes.php");
//     const data = await res.json();

//     list.innerHTML = "";

//     data.forEach(item => {
//       list.innerHTML += `
//         <div class="guest-item reveal up">
//           <span class="guest-name">${item.name}</span>
//           <p class="guest-message">${item.message}</p>
//         </div>
//       `;
//     });

//     reveal();
//   }

//   list.addEventListener("scroll", reveal);
//   loadWishes();
// });

// // =========================================================================
// // RSVP FORM SUBMISSION LOGIC
// // =========================================================================
// const rsvpForm = document.getElementById("rsvpForm");

// // SYSTEM AUTO-LOCK RSVP: Ubah tombol pemicu modal RSVP jika waktu sudah lewat
// if (isCountdownExpired()) {
//   const rsvpBtn = document.querySelector("[data-bs-target='#rsvpModal']"); 
//   if (rsvpBtn) {
//     rsvpBtn.disabled = true;
//     rsvpBtn.innerText = "RSVP Ditutup";
//   }
// }

// rsvpForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   // Proteksi ganda di sisi client agar data tidak ter-post ke PHP
//   if (isCountdownExpired()) {
//     showToast("Mohon maaf, konfirmasi RSVP sudah ditutup 🙏", "error");
//     bootstrap.Modal.getInstance(document.getElementById("rsvpModal")).hide();
//     return;
//   }

//   const name = rsvpName.value.trim();
//   const attendance = rsvpAttendance.value;
//   const guests = rsvpGuests.value;

//   if (!name || !attendance) {
//     showToast("Nama & konfirmasi wajib diisi", "error");
//     return;
//   }

//   const data = new FormData();
//   data.append("name", name);
//   data.append("attendance", attendance);
//   data.append("guests", guests);

//   fetch("api/save-rsvp.php", {
//     method: "POST",
//     body: data
//   })
//     .then(res => res.text())
//     .then(res => {
//       if (res.trim() === "success") {
//         bootstrap.Modal.getInstance(document.getElementById("rsvpModal")).hide();
//         rsvpForm.reset();
//         showToast("Konfirmasi berhasil❤️", "success");
//       } else {
//         showToast("Gagal menyimpan RSVP 😢", "error");
//       }
//     })
//     .catch(() => {
//       showToast("Server error, coba lagi", "error");
//     });
// });

// // =========================================================================
// // RSVP FORM INTERACTIVE LOGIC
// // =========================================================================
// const attendanceSelect = document.getElementById("rsvpAttendance");
// const guestsSelect = document.getElementById("rsvpGuests");

// attendanceSelect.addEventListener("change", () => {
//   if (attendanceSelect.value === "Tidak Hadir") {
//     guestsSelect.value = 0;
//     guestsSelect.disabled = true;
//   } else {
//     // Dropdown jumlah tamu tetap terkunci jika sudah expired
//     if (!isCountdownExpired()) {
//       guestsSelect.disabled = false;
//     }
//   }
// });

// // =========================================================================
// // SYSTEM TOAST NOTIFICATION
// // =========================================================================
// function showToast(message, type = "success") {
//   const toast = document.getElementById("toast");
//   toast.textContent = message;
//   toast.className = `nf-toast show ${type}`;

//   setTimeout(() => {
//     toast.classList.remove("show");
//   }, 3000);
// }
// // ++++++++++++++ END UPDATE KE2 WHISES & PRAYERS DSIPLAY +++++++++++++++++++++


// =========================================================================
// CONFIGURATION & TIME VALIDATION
// =========================================================================

// Tentukan tanggal target acara Anda (Format: YYYY-MM-DDTHH:mm:ss)
const TARGET_DATE = new Date("2026-03-26T08:00:00").getTime();

// Fungsi global untuk mengecek apakah waktu sudah melewati target (Expired)
function isCountdownExpired() {
  const now = new Date().getTime();
  return now > TARGET_DATE;
}

// =========================================================================
// GUESTBOOK & WISHES LOGIC (DOMContentLoaded)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("guestForm");
  const list = document.getElementById("guestList");

  if (!form || !list) return;

  // SYSTEM AUTO-LOCK & RE-TEXT: Jika waktu countdown sudah terlewati
  if (isCountdownExpired()) {
    // 1. Kunci tombol submit dan ubah teksnya sesuai request sebelumnya
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Wishes & Prayers Closed";
    }
    
    // 2. Sembunyikan elemen input teks dan textarea bawaan agar rapi
    form.querySelectorAll("input, textarea, label, .form-group").forEach(el => {
      // Sembunyikan semua elemen input kecuali tombol submit
      if (el.tagName !== "BUTTON") {
        el.style.display = "none";
      }
    });

    // 3. Sisipkan kalimat pemberitahuan baru tepat di atas tombol submit
    const infoMessage = document.createElement("div");
    infoMessage.className = "expired-notice-text";
    infoMessage.style.textAlign = "center";
    infoMessage.style.padding = "20px 10px";
    infoMessage.style.marginBottom = "15px";
    infoMessage.style.fontSize = "1rem";
    infoMessage.style.fontStyle = "italic";
    infoMessage.style.color = "#555"; // Sesuaikan dengan tone warna web Anda
    infoMessage.innerHTML = "Ucapan dan doa dari rekan - rekan, keluarga dll sudah kami terima, terimakasih ❤️";
    
    // Taruh pesan di bagian paling atas di dalam form
    form.insertBefore(infoMessage, form.firstChild);
  }

  // Handle Submit Form Ucapan
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Proteksi ganda jika user mencoba tembus lewat inspect element
    if (isCountdownExpired()) {
      showToast("Mohon maaf, periode pengiriman ucapan sudah berakhir 🙏", "error");
      return;
    }

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

  // Handle Ambil Data Ucapan
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
  // loadWishes(); // <-- Cukup comment bagian ini agar tidak mencari database/file PHP
});

// =========================================================================
// RSVP FORM SUBMISSION LOGIC
// =========================================================================
const rsvpForm = document.getElementById("rsvpForm");

// SYSTEM AUTO-LOCK RSVP: Ubah tombol pemicu modal RSVP jika waktu sudah lewat
if (isCountdownExpired()) {
  const rsvpBtn = document.querySelector("[data-bs-target='#rsvpModal']"); 
  if (rsvpBtn) {
    rsvpBtn.disabled = true;
    rsvpBtn.innerText = "RSVP Ditutup";
  }
}

rsvpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Proteksi ganda di sisi client agar data tidak ter-post ke PHP
  if (isCountdownExpired()) {
    showToast("Mohon maaf, konfirmasi RSVP sudah ditutup 🙏", "error");
    bootstrap.Modal.getInstance(document.getElementById("rsvpModal")).hide();
    return;
  }

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
        bootstrap.Modal.getInstance(document.getElementById("rsvpModal")).hide();
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

// =========================================================================
// RSVP FORM INTERACTIVE LOGIC
// =========================================================================
const attendanceSelect = document.getElementById("rsvpAttendance");
const guestsSelect = document.getElementById("rsvpGuests");

attendanceSelect.addEventListener("change", () => {
  if (attendanceSelect.value === "Tidak Hadir") {
    rows.value = 0;
    guestsSelect.disabled = true;
  } else {
    // Dropdown jumlah tamu tetap terkunci jika sudah expired
    if (!isCountdownExpired()) {
      guestsSelect.disabled = false;
    }
  }
});

// =========================================================================
// SYSTEM TOAST NOTIFICATION
// =========================================================================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `nf-toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
