emailjs.init('_JkFiZSL4P4Y4auxY');

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  emailjs.sendForm('service_ydscscr', 'template_b9xyr17', this)
    .then(() => {
      this.reset(); // Optionally clear the form fields
      showSuccessPopup();
    }, (error) => {
      alert('Failed to send message: ' + error.text);
    });
});

function showSuccessPopup() {
  var popup = document.getElementById('success-popup');
  popup.classList.add('show');
  setTimeout(function() {
    popup.classList.remove('show');
  }, 3000); // Popup visible for 3.4 seconds
}
