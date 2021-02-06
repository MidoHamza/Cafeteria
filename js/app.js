// Hide preloader

// All the images script links have finished loading

// Windows event list

eventListeners();
function eventListeners() {
  const ui = new UI();
  //preoader
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });

  // nav btn
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });
  // Control the video
  document
    .querySelector(".video__switch")
    .addEventListener("click", function() {
      ui.videoControls();
    });
  // Submit the form
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;
      let value = ui.checkEmpty(name, lastName, email);
      if (value) {
        let customer = new Customer(name, lastName, email);
        console.log(customer);
        ui.addCustomer(customer);
        ui.showFeedback("customer added to the list", "success");
        ui.clearFields();
      } else {
        ui.showFeedback("some form values are empty", "error");
      }
    });
  // Display Modal
  const links = document.querySelectorAll(".work-item__icon");
  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });
  // Hide Modal
  document
    .querySelector(".work-modal__close")
    .addEventListener("click", function() {
      ui.closeModal();
    });
}

// constructor function
function UI() {}
// hide preloader
UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};
// Show nav
UI.prototype.showNav = function() {
  document.querySelector(".nav").classList.toggle("nav--show");
};
// play and pause the video
UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video__item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video__item").play();
  }
};
// Check for empty values
UI.prototype.checkEmpty = function(name, lastName, email) {
  let result;
  if (name === "" || lastName === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function(text, type) {
  if (type === "success") {
    const feedback = document.querySelector(".drink-form__feedback");
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};
// remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".drink-form__feedback").classList.remove(type);
  }, 3000);
};

//ES6
// class UI {
//hidePreloader() {
//	document.querySelector('.preloader').style.display = "none";
//}
// showNav(){
//	 document.querySelector('.nav').classList.toggle('nav--show')
// }
////}
//           // event listeners
//eventListeners();
//function eventListeners() {
//	const ui = new UI()
//	       //preloader
//	window.addEventListener('load', () =>  ui.hidePreloader());
//	       //nav btn
//	document.querySelector('.navBtn').addEventListener('click', () => ui.showNav());
//}

// Add customer

UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
						<h4 class="person__name">${customer.name}</h4>
						<h4 class="person__lastname">${customer.lastName}</h4>`;
  document.querySelector(".drink-card__list").appendChild(div);
};

// clear form fields

UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};
// Show Modal
UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    let id = event.target.parentElement.dataset.id;
    const modal = document.querySelector(".work-modal");
    const modalItem = document.querySelector(".work-modal__item");
    modal.classList.add("work-modal--show");
    modalItem.style.background = `url(img/work-${id}.jpeg)`;
  }
};
// Close Modal
UI.prototype.closeModal = function() {
  document.querySelector(".work-modal").classList.remove("work-modal--show");
};

// Object constructor function
// customer
function Customer(name, lastName, email) {
  this.name = name;
  this.lastName = lastName;
  this.email = email;
}
