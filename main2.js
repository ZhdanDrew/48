const createdElement = document.querySelector("#element");

const listener = () => {
  console.log("Hello from main2.js");
};

createdElement.addEventListener("click", listener);
createdElement.removeEventListener("click", listener);
