import "./css/styles.css";
import refs from "./js/refs.js";
import "webpack-material-design-icons";
import PixabayAPI from "./js/PixabayAPI.js";
import debounce from "lodash.debounce";
import pictureTemplate from "./templates/picture.hbs";
import openLargeImg from "./js/lightbox.js";
import PNotify from "./js/Pnotify.js";
import Pnotify from "./js/Pnotify.js";

const NewPixabay = new PixabayAPI();

const {
  succsessNotification,
  errorNotification,
  noticeNotification,
  emptyNotification,
} = Pnotify;

const { gallery, form, loadMoreSpinner, arrow } = refs;

noticeNotification();

window.addEventListener("scroll", infiniteScroll);

gallery.addEventListener("click", openLargeImg);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

form.addEventListener(
  "input",
  debounce((event) => {
    gallery.innerHTML = "";
    NewPixabay.resetPage();
    NewPixabay.query = event.target.value;
    if (NewPixabay.query === "") emptyNotification();
    hideArrow();
    showLoading();
    setTimeout(addDataToDOM, 2000);
  }, 1000),
);

function showLoading() {
  loadMoreSpinner.classList.remove("isHidden");
}

function hideLoading() {
  loadMoreSpinner.classList.add("isHidden");
}

function addDataToDOM() {
  NewPixabay.fetchRequest()
    .then((request) => pictureTemplate(request))
    .then((markup) => {
      succsessNotification();
      gallery.insertAdjacentHTML("beforeend", markup);
      if (gallery.children.length === 0) showArrow();
    })
    .catch(errorNotification)
    .finally(hideLoading());
}

function infiniteScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    showLoading();
    setTimeout(addDataToDOM, 2000);
  }
}

function hideArrow() {
  arrow.classList.add("isHidden");
}

function showArrow() {
  arrow.classList.remove("isHidden");
}
