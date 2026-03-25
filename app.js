let currentStep = 0;
const steps = document.querySelectorAll(".step");
const stepNumber = document.getElementById("stepNumber");

function showStep(index){
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === index);
    });
    stepNumber.textContent = index + 1;
}

function nextStep(){
    if(currentStep < steps.length - 1){
        currentStep++;
        showStep(currentStep);
    } else {
        document.getElementById("onboardStatus").innerText =
        "Activation request received. Operion will initialise your system.";
    }
}

function prevStep(){
    if(currentStep > 0){
        currentStep--;
        showStep(currentStep);
    }
}

function scrollToDemo(){
    document.getElementById("demo").scrollIntoView({behavior:"smooth"});
}

function scrollToOnboard(){
    document.getElementById("onboard").scrollIntoView({behavior:"smooth"});
}

/* Demo form */
document.getElementById("demoForm").onsubmit = function(e){
    e.preventDefault();
    document.getElementById("demoStatus").innerText =
    "Demo request received.";
};

/* Initialise */
showStep(currentStep);
