function toggleMenu() {
    const navItems = document.getElementById("nav-items");
    const menuIcon = document.getElementById("menu-icon");
    const ctaButton = document.getElementById("cta-btn");
  
    console.log("Toggling menu..."); // Debugging
    navItems.classList.toggle("active");
  
    if (navItems.classList.contains("active")) {
      menuIcon.classList.replace("fa-bars", "fa-times");
      ctaButton.style.display = "none"; // hide button on mobile menu open
    } else {
      menuIcon.classList.replace("fa-times", "fa-bars");
      ctaButton.style.display = "inline-block"; // show button when closed
    }
  }
  
  // Responsive menu handling
  window.addEventListener("resize", () => {
    const navItems = document.getElementById("nav-items");
    const menuIcon = document.getElementById("menu-icon");
    const ctaButton = document.getElementById("cta-btn");
  
    if (window.innerWidth > 768) {
      navItems.classList.remove("active");
      menuIcon.classList.replace("fa-times", "fa-bars");
      ctaButton.style.display = "inline-block";
    }
  });

