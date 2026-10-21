const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showStatus(status, message, kind) {
  status.textContent = message;
  status.classList.remove("is-error", "is-success");
  status.classList.add(kind);
}

function handleSignup(event) {
  event.preventDefault();
  const input = document.getElementById("emailAddress");
  const status = document.getElementById("signupStatus");
  const email = input.value.trim();

  if (email === "") {
    input.setAttribute("aria-invalid", "true");
    showStatus(status, "Please enter your email address.", "is-error");
    input.focus();
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    input.setAttribute("aria-invalid", "true");
    showStatus(status, "That email address does not look right. Try name@example.com.", "is-error");
    input.focus();
    return;
  }

  input.removeAttribute("aria-invalid");
  showStatus(status, "Thanks! This week's open times are on their way to " + email + ".", "is-success");
  event.target.reset();
}

function toggleBackToTop() {
  const button = document.getElementById("backToTop");
  button.classList.toggle("is-visible", window.scrollY > 600);
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("signupForm").addEventListener("submit", handleSignup);
  document.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();
});
