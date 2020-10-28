const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


const authButton = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  if(modalAuth.classList.contains('is-open')) {
    disableScroll();
  }
  else {
    enableScroll();
  }
}

function clearForm() {  
  loginInput.style.borderColor = '';
  logInForm.reset();
}

function authorized() {

  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
    authButton.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';    
  }

  userName.textContent = login;

  authButton.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);

}

function notAuthorized() {
  function logIn(event)
  {    
    event.preventDefault();
    login = loginInput.value.trim();        //trim удаляет пробелы справа и слева    

    if(!login) {
      loginInput.style.borderColor = '#ff0000';
      loginInput.value = '';
    }
    else {    
      localStorage.setItem('gloDelivery', login);

      toggleModalAuth();
      authButton.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
    checkAuth();
    }
  }

  authButton.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', function(event) {
    if(event.target.classList.contains('is-open')) {
      toggleModalAuth();
    }});
}

authButton.addEventListener('click', clearForm);

function checkAuth()
{
  if(login)
  {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();