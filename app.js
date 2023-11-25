// fix search pressed state
//  fix search focus also

const notificationBtn = document.querySelector(".shopify__notification");
const progressBar = document.querySelector(".progress__bar");
const progressCompleted = document.querySelector(".progress__completed");
const trialInfoExitBtn = document.querySelector(".trial__exit");
const shopify__store = document.querySelector(".shopify__links");

const mainExitBtn = document.querySelector(".setup__collapse");
const innerRotateExitBtn = document.querySelector(".inner_collpase");
const mainListItemBox = document.querySelector(".main__listItem-container");
const get_AllMainChildHeader__Button = document.querySelectorAll(
  ".main__list__item__header"
);
const allMainChildBox = document.querySelectorAll(".main__list__child__box");
let inActive = [1, 2, 3, 4, 5];
let shopifyCounter = 0;

mainExitBtn.addEventListener("click", (e) => {
  // inner main exiut button
  const btnExpanded = mainExitBtn.getAttribute("aria-expanded") === "true";
  innerRotateExitBtn.classList.toggle("rotate__arrow");
  innerRotateExitBtn.classList.toggle("rotate__default");
  mainListItemBox.classList.toggle("item__hidden");
  mainExitBtn.setAttribute("aria-expanded", !btnExpanded);
  console.log(btnExpanded);
  console.log(btnExpanded, inActive);
  if (!btnExpanded) {
    setTimeout(() => {
      focusOnTopPrioprity(true);
    }, 100);
  }
});

// -------- usage for child main box -----------------------
// get all button on main list item
// const allMainChild
const resetAllMainChildBox = () => {
  [...allMainChildBox].forEach((parentItem) => {
    parentItem.classList.remove("bolden__header");
    parentItem.querySelector(".main__list__sub").classList.add("item__hidden");
    parentItem
      .querySelector(".main__list__image")
      .classList.add("item__hidden");
    // reset all aria tag in it
    parentItem.querySelector(".main__list__item__header").ariaExpanded = false;
    parentItem.querySelector(".main__list__sub").ariaHidden = true;
    parentItem.querySelector(".main__list__item__button").tabIndex = "-1";
    if (parentItem.querySelector(".import__button")) {
      parentItem.querySelector(".import__button").tabIndex = "-1";
    }
  });
};

const addActiveToMaincChildBox = (eventTarget) => {
  const childTextBox = eventTarget.querySelector(".main__list__sub");
  const childImageBox = eventTarget.querySelector(".main__list__image");
  eventTarget.classList.add("bolden__header");
  childTextBox.classList.remove("item__hidden");
  childImageBox.classList.remove("item__hidden");

  //add aria to recent clicked box
  eventTarget.querySelector(".main__list__item__header").ariaExpanded = true;
  eventTarget.querySelector(".main__list__sub").ariaHidden = false;
  eventTarget.querySelector(".main__list__item__button").tabIndex = "0";
  childTextBox.focus();
  if (eventTarget.querySelector(".import__button")) {
    eventTarget.querySelector(".import__button").tabIndex = "0";
  }
};

// ---------------------- END -------------------

// ---------------- checkbox mainItem ------------------
const handleToCheckBox = (parentItem) => {
  const aria__checked = parentItem.getAttribute("aria-checked") === "true";
  const unChecked = parentItem.querySelector(".checkbox__svg");
  const loading = parentItem.querySelector(".svg__rotate__checkbox");
  const checked = parentItem.querySelector(".done_svg");

  if (!aria__checked) {
    parentItem.setAttribute("aria-checked", true);
    unChecked.classList.add("item__hidden");
    loading.classList.remove("item__hidden");
    setTimeout(() => {
      loading.classList.add("item__hidden");
      checked.classList.remove("item__hidden");
      progressBar.value = progressBar.value + 1;
      progressBar.textContent = `${progressBar.value} out of 5 checkbox completed`;
      progressCompleted.textContent = `${progressBar.value} / 5 completed`;

      // work on moving active state since it is checked..move active state to the next uncompleted one
      const mainParentItemTag = +parentItem.closest(".main__list__child__box")
        .dataset.tag;
      onCompletedCheckBox(mainParentItemTag);
    }, 300);
  } else {
    parentItem.setAttribute("aria-checked", false);
    checked.classList.add("item__hidden");
    loading.classList.remove("item__hidden");
    setTimeout(() => {
      loading.classList.add("item__hidden");
      unChecked.classList.remove("item__hidden");
      progressBar.value = progressBar.value - 1;
      // console.log(progressBar);
      progressBar.textContent = `${progressBar.value} out of 5 checkbox completed`;
      progressCompleted.textContent = `${progressBar.value} / 5 completed`;

      // auto move
      const mainParentItemTag = +parentItem.closest(".main__list__child__box")
        .dataset.tag;
      // console.log(mainParentItemTag);
      onNotCompletedChecked(mainParentItemTag);
    }, 300);
  }
};

const onCompletedCheckBox = (parent_data_tag) => {
  let activeMain__BoxTracker = document.querySelector(".bolden__header");
  // console.log(activeMain__BoxTracker);
  if (
    inActive[0] &&
    inActive[1] &&
    parent_data_tag === Number(activeMain__BoxTracker.dataset.tag)
  ) {
    inActive = inActive.filter(
      (num) => num !== Number(activeMain__BoxTracker.dataset.tag)
    );
    const nextParentTag = document.querySelector(`[data-tag="${inActive[0]}"]`);
    resetAllMainChildBox();
    addActiveToMaincChildBox(nextParentTag);
    console.log(nextParentTag.querySelector(".checkbox__box"));
    nextParentTag.querySelector(".checkbox__box").focus();
  } else {
    // check if active box is equal to the checkbox clicked
    inActive = inActive.filter((num) => num !== Number(parent_data_tag));
    focusOnTopPrioprity();
  }
};

// add the deleted tag to the inactive state
const onNotCompletedChecked = (value) => {
  inActive = [...inActive, value].sort();
};

// focus on the first mainchildBox unchecked boxes
const focusOnTopPrioprity = (state = false) => {
  if (inActive.length > 0) {
    // focus on the top priority checkbox
    console.log(
      document
        .querySelector(`[data-tag="${inActive[0]}"]`)
        .querySelector(".checkbox__box")
    );
    document
      .querySelector(`[data-tag="${inActive[0]}"]`)
      .querySelector(".checkbox__box")
      .focus();
  }
  // if you still wan to focus on the first item
  if (state) {
    document
      .querySelector(`[data-tag="1"]`)
      .querySelector(".checkbox__box")
      .focus();
  }
};

// ---------------- END ------------------

window.addEventListener("click", (e) => {
  // console.dir(e.target);
  if (e.target.className === "main__list__item__header") {
    const parentElement = e.target.closest(".main__list__child__box");
    resetAllMainChildBox();
    addActiveToMaincChildBox(parentElement);
  }

  if (
    e.target.closest(".checkbox__box") &&
    !(e.target.className === "svg__rotate__checkbox")
  ) {
    const parentElement = e.target.closest(".checkbox__box");
    if (e.target.closest(".checkbox__svg")) {
      handleToCheckBox(parentElement, true);
    }
    if (e.target.closest(".done_svg")) {
      handleToCheckBox(parentElement);
    }
  }
});

const shopifyVerticalScrollable = () => {
  const allLink = document.querySelectorAll(".scrollable__link");
  if (shopifyCounter < allLink.length - 1) {
    shopifyCounter = shopifyCounter + 1;
    console.log(shopifyCounter);
    allLink[shopifyCounter].focus();
  }
};

const shopifyHorizontalScrollable = () => {
  const allLink = document.querySelectorAll(".scrollable__link");
  console.log(shopifyCounter);
  if (0 < shopifyCounter) {
    shopifyCounter = shopifyCounter - 1;
    console.log(shopifyCounter);
    allLink[shopifyCounter].focus();
  }
};

// focus event-listeners

window.addEventListener("keydown", (e) => {
  // console.log(e.code, e.target);
  if (e.code === "Space" && e.target.className === "checkbox__box") {
    handleToCheckBox(e.target);
  }
  if (
    e.code === "ArrowDown" &&
    shopify__store.getAttribute("aria-expanded") === "true"
  ) {
    shopifyVerticalScrollable();
  }
  if (
    e.code === "ArrowUp" &&
    shopify__store.getAttribute("aria-expanded") === "true"
  ) {
    shopifyHorizontalScrollable();
  }
});

//remove trial information
trialInfoExitBtn.addEventListener("click", () => {
  document.querySelector(".trial__container").classList.add("item__hidden");
});

// notifcation button

const notifcationFunc = (e) => {
  const btn_expanded = notificationBtn.getAttribute("aria-expanded") === "true";
  const notifcation__dropDwon = document.querySelector(
    ".notifcation__dropdown"
  );
  if (e.target.closest(".shopify__notification")) {
    if (!btn_expanded) {
      notificationBtn.setAttribute("aria-expanded", !btn_expanded);
      notifcation__dropDwon.classList.add("notifcation__dropdown__toggle");
      document.querySelector(".filter__button").focus();
    } else {
      notificationBtn.setAttribute("aria-expanded", !btn_expanded);
      notifcation__dropDwon.classList.remove("notifcation__dropdown__toggle");
    }
  }

  // click somewhere out of the div
  if (
    !e.target.closest(".shopify__notification") &&
    btn_expanded &&
    !e.target.closest(".notifcation__dropdown")
  ) {
    notificationBtn.setAttribute("aria-expanded", !btn_expanded);
    notifcation__dropDwon.classList.remove("notifcation__dropdown__toggle");
  }
};

const myStoreFunc = (e) => {
  const btn_expanded = shopify__store.getAttribute("aria-expanded") === "true";
  const myStore__dropDown = document.querySelector(".store__dropdown");
  console.log(btn_expanded, myStore__dropDown);
  if (e.target.closest(".shopify__links")) {
    if (!btn_expanded) {
      shopify__store.setAttribute("aria-expanded", !btn_expanded);
      myStore__dropDown.classList.add("notifcation__dropdown__toggle");
      document.querySelector(".store__second-header").focus();
    } else {
      shopify__store.setAttribute("aria-expanded", !btn_expanded);
      myStore__dropDown.classList.remove("notifcation__dropdown__toggle");
    }
  }

  // if the link is clicked.. close the modal..
  if (e.target.closest(".scrollable__link")) {
    console.log(e.target);
    shopify__store.setAttribute("aria-expanded", !btn_expanded);
    myStore__dropDown.classList.remove("notifcation__dropdown__toggle");
  }
  if (
    !e.target.closest(".shopify__links") &&
    btn_expanded &&
    !e.target.closest(".store__dropdown")
  ) {
    // click somewhere out of the div
    shopify__store.setAttribute("aria-expanded", !btn_expanded);
    myStore__dropDown.classList.remove("notifcation__dropdown__toggle");
  }
};

window.addEventListener("click", (e) => {
  notifcationFunc(e);
  myStoreFunc(e);
});

// console.log(notificationBtn);
