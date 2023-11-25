// fix search pressed state
//  fix search focus also

const doc = document.querySelector(".progress__bar");
const docL = document.querySelector(".progress__completed");
const docR = document.querySelector(".setup__text");
const mainExitBtn = document.querySelector(".setup__collapse");
const innerRotateExitBtn = document.querySelector(".inner_collpase");
const mainListItemBox = document.querySelector(".main__listItem-container");
const get_AllMainChildHeader__Button = document.querySelectorAll(
  ".main__list__item__header"
);
const allMainChildBox = document.querySelectorAll(".main__list__child__box");
let activeMain__BoxTracker = document.querySelector(".bolden__header");

mainExitBtn.addEventListener("click", (e) => {
  // inner main exiut button
  innerRotateExitBtn.classList.toggle("rotate__arrow");
  innerRotateExitBtn.classList.toggle("rotate__default");
  // setimeout... sometimes the dropdown is too fast and closes..instead of opening..using setimeout
  // slows down the action
  // if (mainListItemBox.classList.contains("anime__main__listItem-container")) {
  //   setTimeout(() => {
  //     mainListItemBox.classList.remove("anime__main__listItem-container");
  //     mainListItemBox.classList.add("collpase__lol");
  //   }, 50);
  // } else {
  //   setTimeout(() => {
  //     mainListItemBox.classList.remove("collpase__lol");
  //     mainListItemBox.classList.add("anime__main__listItem-container");
  //   }, 50);
  // }
});

docL.addEventListener("click", () => {
  console.log("sjsjjs");
  console.log(doc.value);
  doc.value = doc.value + 1;
});

docR.addEventListener("click", () => {
  console.log("sjsjjs");
  console.log(doc.value);
  doc.value = doc.value - 1;
});

// get all button on main list item
// const allMainChild
const resetAllMainChildBox = (parentItem) => {
  parentItem.classList.remove("bolden__header");
  parentItem.querySelector(".main__list__sub").classList.add("item__hidden");
  parentItem.querySelector(".main__list__sub").classList.add("item__hidden");
};

const addActiveToMaincChildBox = (eventTarget) => {
  console.log(eventTarget);
  const childTextBox = eventTarget.querySelector(".main__list__sub");
  const childImageBox = eventTarget.querySelector(".main__list__image");
  eventTarget.classList.add("bolden__header");
  childTextBox.classList.remove("item__hidden");
  childImageBox.classList.remove("item__hidden");
};

[...get_AllMainChildHeader__Button].forEach((el) => {
  el.addEventListener("click", (e) => {
    // console.log(e.currentTarget, e.target);
    const parentElement = e.target.closest(".main__list__child__box");

    if (2) {
      [...allMainChildBox].forEach((item) => {
        // console.log(item);
        resetAllMainChildBox(item);
      });
      addActiveToMaincChildBox(parentElement);
    }

    console.log(parentElement.dataset.tag, activeMain__BoxTracker.dataset.tag);
  });
});
