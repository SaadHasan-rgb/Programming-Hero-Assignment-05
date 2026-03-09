const loginButton = document.getElementById("loginBtnMain");

loginButton.addEventListener("click", function(){

let usernameInput = document.getElementById("userField").value.trim();
let passwordInput = document.getElementById("passField").value.trim();

if(usernameInput === "admin" && passwordInput === "admin123"){

document.getElementById("userField").value = "";
document.getElementById("passField").value = "";

window.location.href = "main.html";

}else{

document.getElementById("userField").value = "";
document.getElementById("passField").value = "";

document.getElementById("loginErrorBox").showModal();

}

});