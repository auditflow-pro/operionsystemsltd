function scrollToDemo(){
  document.getElementById("demo").scrollIntoView();
}

function scrollToOnboard(){
  document.getElementById("onboard").scrollIntoView();
}

document.getElementById("demoForm").onsubmit = function(e){
  e.preventDefault();
  document.getElementById("demoStatus").innerText =
    "Demo request received. Operion will respond.";
};

document.getElementById("onboardForm").onsubmit = function(e){
  e.preventDefault();
  document.getElementById("onboardStatus").innerText =
    "Redirecting to secure payment...";
};
