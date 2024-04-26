const header = document.querySelector("header");

const printOnlyLink = document.createElement("p");
printOnlyLink.classList.add("absolute-top-right");
printOnlyLink.classList.add("print-only");
const printOnlyLinkSmall = document.createElement("small");
printOnlyLink.append(printOnlyLinkSmall);
const printOnlyLinkAnchor = document.createElement("a");
printOnlyLinkAnchor.href = window.location;
printOnlyLinkAnchor.innerText = "View this page on the web";
printOnlyLinkSmall.append(printOnlyLinkAnchor);
header.prepend(printOnlyLink);
