const fileInput = document.getElementById("fileInput");
const uploadSection = document.getElementById("uploadSection");
const uploadedImage = document.getElementById("uploadedImage");
const loginModal = document.getElementById("loginModal");
const getStartedBtn = document.getElementById("getStartedBtn");
const openLogin = document.getElementById("openLogin");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");

document.getElementById("year").textContent = new Date().getFullYear();

// Image upload preview
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImage.src = event.target.result;
      uploadSection.style.display = "block";
      uploadSection.scrollIntoView({ behavior: "smooth" });
    };
    reader.readAsDataURL(file);
  }
});

// Open modal
[getStartedBtn, openLogin].forEach((btn) =>
  btn.addEventListener("click", () => {
    loginModal.classList.add("active");
  })
);

// Close modal
closeModal.addEventListener("click", () => {
  loginModal.classList.remove("active");
});

// Click outside to close modal
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("active");
  }
});

// Handle login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login successful (demo)");
  loginModal.classList.remove("active");
});
