// Load EmailJS SDK (add this <script> tag in your HTML before using this script)
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

// Initialize EmailJS with your public key
emailjs.init('_JkFiZSL4P4Y4auxY');

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  emailjs.sendForm('service_ydscscr', 'template_b9xyr17', this)
    .then(() => {
      alert('Message sent successfully!');
      this.reset(); // Optionally clear the form fields
    }, (error) => {
      alert('Failed to send message: ' + error.text);
    });
});
