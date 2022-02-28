// NAV
// const btnToggleNav = document.querySelector('.nav-primary__toggle');
// const menuWrapper = document.querySelector('.nav-primary__menu-wrapper');
// const logoNav = document.querySelector('.nav-primary .logo');

// const toggleMenu = function(e) {
//   this.classList.toggle('nav-primary__toggle--open');
//   menuWrapper.classList.toggle('nav-primary__menu-wrapper--visible');
//   logoNav.classList.toggle('logo--light-on-sm');
// };

// btnToggleNav.addEventListener('click', toggleMenu);

const mainNav = document.querySelector('.nav-primary');
const btnToggleNav = mainNav.querySelector('.nav-primary__toggle');
const menu = mainNav.querySelector('.nav-primary__menu');
const logoNav = mainNav.querySelector('.logo');
const isMenuOpen = () => mainNav.classList.contains('nav-primary--open');

const toggleMenu = function(e) {
  mainNav.classList.toggle('nav-primary--open');
  logoNav.classList.toggle('logo--light-on-sm');
  document.body.classList.toggle('no-scroll');
  this.setAttribute('aria-expanded', String(isMenuOpen()));
};

btnToggleNav.addEventListener('click', toggleMenu);

// TAB LIST
const tabList = document.querySelector('.tab-list');
const tabListNavItems = tabList.querySelectorAll('.tab-list__nav-item');
let currentActiveNavItem= tabList.querySelector('.tab-list__nav-item--active');

const isTabActive = tab => tab.classList.contains('tab-list__nav-item--active');
const getTabItem = tab => tabList.querySelector(tab.children[0].getAttribute('href'));

const desactiveTab = function(tab) {
  if(!isTabActive(tab)) return;

  const tabItem = getTabItem(tab);
  tab.classList.remove('tab-list__nav-item--active');
  tabItem.classList.remove('tab-list__item--active');
};

const activeTab = function(tab) {
  if(isTabActive(tab)) return;

  const tabItem = getTabItem(tab);
  tab.classList.add('tab-list__nav-item--active');
  tabItem.classList.add('tab-list__item--active');
}

const handlerNavItemOnClick = function(e) {
  e.preventDefault();
  if(isTabActive(this)) return;

  desactiveTab(currentActiveNavItem);
  activeTab(this);
  currentActiveNavItem = this;
};

tabListNavItems.forEach(tab => tab.addEventListener('click', handlerNavItemOnClick));

//ACCORDION
const accordion = document.querySelector('.accordion');
const accordionItems = [... accordion.children];

const handlerAccordionItemOnClick = e => e.currentTarget.classList.toggle('accordion__item--open');

accordionItems.forEach(item => item.addEventListener('click', handlerAccordionItemOnClick));

//FORM

// Variables
const formContact = document.querySelector('#form-contact');
let timer;

// General Functions
const clearErrorOnField = function(form, fieldName) {
  const field = form[fieldName];
  if(!field) return null;
  const formGroup = field.closest('.form__group');

  return function() {
    delete formGroup.dataset.errorMsg;
    formGroup.classList.remove('form__group--error');
  }
};

const setErrorOnField = function(form, fieldName) {
  const field = form[fieldName];
  if(!field) return null;
  const formGroup = field.closest('.form__group');

  return function(msg) {
    formGroup.dataset.errorMsg = msg;
    formGroup.classList.add('form__group--error');
  }
};

// Event handlers
const handlerFormOnSubmit = function(e) {
  e.preventDefault();
  
  const email = this['email'];

  if(email.validity.valueMissing) {
    setErrorOnEmail('Email is required');
    timer = setTimeout(() => clearErrorOnEmail(), 3000);
  }

  if(email.validity.typeMismatch) {
    setErrorOnEmail('Whoops, make sure it\'s an email');
    timer = setTimeout(() => clearErrorOnEmail(), 3000);
  }
}

const handlerEmailOnFocus = function() {
  clearTimeout(timer);
  clearErrorOnEmail();
};

//main
const clearErrorOnEmail = clearErrorOnField(formContact, 'email');
const setErrorOnEmail = setErrorOnField(formContact, 'email');
formContact.addEventListener('submit', handlerFormOnSubmit);
formContact['email'].addEventListener('focus', handlerEmailOnFocus);
