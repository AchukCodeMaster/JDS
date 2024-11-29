document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Here you would typically send the form data to a server
    // For now, we'll just log it and show a success message
    console.log("Form submitted:", formData);

    // Show success message
    alert("Thank you for your message! We will get back to you soon.");

    // Reset form
    contactForm.reset();
  });
});
