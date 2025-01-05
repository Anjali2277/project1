document.addEventListener('DOMContentLoaded', function() {
    var aboutDropdown = document.querySelector('.about-dropdown');
  
    // Show About Us submenu on hover
    aboutDropdown.addEventListener('mouseover', function() {
      var aboutSubmenu = this.querySelector('.about-submenu');
      if (aboutSubmenu) {
        aboutSubmenu.style.display = "block";
      }
    });
  
    // Hide About Us submenu on mouseout
    aboutDropdown.addEventListener('mouseout', function() {
      var aboutSubmenu = this.querySelector('.about-submenu');
      if (aboutSubmenu) {
        aboutSubmenu.style.display = "none";
      }
    });
  
    var divisionSubmenu = document.querySelector('.division-submenu');
  
    // Show Division submenu on hover
    divisionSubmenu.addEventListener('mouseover', function() {
      var divisionSubmenuContent = this.querySelector('.division-submenu-content');
      if (divisionSubmenuContent) {
        divisionSubmenuContent.style.display = "block";
      }
    });
  
    // Hide Division submenu on mouseout
    divisionSubmenu.addEventListener('mouseout', function() {
      var divisionSubmenuContent = this.querySelector('.division-submenu-content');
      if (divisionSubmenuContent) {
        divisionSubmenuContent.style.display = "none";
      }
    });
    
    
  });
  document.addEventListener('DOMContentLoaded', () => {
    const alerts = [
      "Alert 1: This is an important message!",
      "Alert 2: Please check your email for updates.",
      "Alert 3: New features have been added!"
    ];
  
    const alertContainer = document.querySelector('.alert-content');
  
    alerts.forEach(alert => {
      const alertElement = document.createElement('span');
      alertElement.className = 'alert';
      alertElement.textContent = alert;
      alertContainer.appendChild(alertElement);
    });
  });
  const testBackendConnection = async () => {
    try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.text();
        console.log(data); // Logs: "Backend is running!"
    } catch (error) {
        console.error('Error connecting to backend:', error);
    }
};

// Call the function (for testing)
testBackendConnection();
const submitFeedback = async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const feedback = document.getElementById('feedback').value;

  const response = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, feedback }),
  });

  const result = await response.json();
  alert(result.message);
};

 