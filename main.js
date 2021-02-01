(() => {
  let itemList = document.getElementById("itemList");
  const toDoInput = document.querySelector(".addInput");
  const deleteButton = document.querySelector(".showDelete");

  //display hour
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const hourContainer = document.getElementById("hour");
  const timezone = () => {
    if (date.getTimezoneOffset() < 0) {
      return `+${date.getTimezoneOffset() / -60}`;
    } else if (date.getTimezoneOffset() > 0) {
      return `${date.getTimezoneOffset() / -60}`;
    }
  };
  hourContainer.innerHTML = `${hour}:${minute} (UTC ${timezone()})`;

  //Event Listeners
  deleteButton.addEventListener("click", (e) => {
    showDeleteBtn();
  });

  document.getElementById("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    receiveToDO(toDoInput.value);
    addToStorage();
  });

  // hide show delete button if the list is empty
  (() => {
    if (
      document.querySelectorAll(".delButton").length == 0 ||
      document.querySelectorAll(".delButton") === undefined
    ) {
      deleteButton.classList.add("hide");
    } else {
      deleteButton.classList.replace("show");
    }
  })();

  // Event Listener execute functions
  function showDeleteBtn() {
    const deleteItemButton = document.querySelectorAll(".delButton");

    for (let i = 0; i < deleteItemButton.length; i++) {
      if (deleteItemButton[i].classList.contains("hide")) {
        deleteItemButton[i].classList.replace("hide", "show");
        deleteButton.classList.replace("off", "on");
      } else {
        deleteItemButton[i].classList.replace("show", "hide");
        deleteButton.classList.replace("on", "off");
      }
    }
  }

  function receiveToDO(input) {
    if (!isInputEmpty(input)) {
      addNewItem(input);
      toDoInput.value = "";
      document.querySelector(".msg").textContent = "";
    } else {
      const msg = "Emm... Please write something";
      document.querySelector(".msg").textContent = msg;
      setTimeout(() => {
        document.querySelector(".msg").textContent = "";
      }, 3000);
    }
  }

  function isInputEmpty(input) {
    if (input == "") {
      return true;
    } else {
      return false;
    }
  }

  function addNewItem(input) {
    if (deleteButton.classList.contains("hide")) {
      deleteButton.classList.replace("hide", "show");
    }

    const newItemEl = document.createElement("li"); // li to contain the item

    const txtSpan = document.createElement("span"); // span to contain the text
    const textNode = document.createTextNode(input); // DOM node that contains text
    txtSpan.appendChild(textNode);

    const delBtnDiv = document.createElement("div");
    const delBtnImg = document.createElement("img");
    const giveClass = (() => {
      if (deleteButton.classList.contains("off")) {
        return "delButton hide";
      } else {
        return "delButton show";
      }
    })();
    delBtnDiv.className = giveClass;

    delBtnImg.src = "./images/close-1214342.png";
    delBtnDiv.appendChild(delBtnImg);

    newItemEl.appendChild(txtSpan);
    newItemEl.appendChild(delBtnDiv);
    itemList.appendChild(newItemEl);

    itemList.addEventListener("click", (e) => {
      let target = e.target;
      clickDelBtn(target);
    });
  }

  function clickDelBtn(target) {
    if (target.parentElement.classList.contains("delButton")) {
      const itemContainer = target.parentElement.parentElement;
      removeItems(itemContainer);
    } else if (target.classList.contains("delButton")) {
      const itemContainer = target.parentElement;
      removeItems(itemContainer);
    }

    // check if the list becomes empty after deleting items, if yes it hides the show delete button
    (() => {
      if (
        document.querySelectorAll(".delButton").length == 0 ||
        document.querySelectorAll(".delButton") === undefined
      ) {
        deleteButton.classList.replace("show", "hide");
      }
    })();
  }

  function addToStorage() {
    let items = itemList.getElementsByTagName("span");

    for (let i = 0; i < items.length; i++) {
      localStorage.setItem(`${i}`, items[i].textContent);
    }
  }

  function removeItems(input) {
    input.remove();
    localStorage.clear();
    addToStorage();
  }

  //TODO: update localStorage after an item is deleted
  /* function updateStorage() {
    for (let i = 0; i <= localStorage.length; i++) {
      localStorage.removeItem(i);
    }
  }
 */
  // check if theres anything stored in localStorage, if yes it'll populate then list with those values
  if (localStorage.length > 0 && itemList.innerHTML == "") {
    for (let i = 0; i < localStorage.length; i++) {
      addNewItem(localStorage.getItem(`${i}`)); // get the values stored in localStorage and fill the list
    }
  }
})();
