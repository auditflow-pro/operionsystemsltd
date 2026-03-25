// ================================
// OPERION INTERFACE CONTROL LAYER
// Deterministic UI State Engine
// ================================

// ---------- NAVIGATION ----------
function scrollToSection(id){
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
}

// ---------- STATE ----------
const STATE = {
    demo: "idle",
    onboard: "idle"
};

// ---------- UTIL ----------
function setStatus(id, message, type="info"){
    const el = document.getElementById(id);
    if (!el) return;

    el.innerText = message;
    el.style.color =
        type === "error" ? "#ef4444" :
        type === "success" ? "#22c55e" :
        "#94a3b8";
}

function validateCheckboxes(form){
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    for (let cb of checkboxes){
        if (!cb.checked){
            return false;
        }
    }
    return true;
}

// ---------- DEMO FORM ----------
const demoForm = document.getElementById("demoForm");

if (demoForm){
    demoForm.addEventListener("submit", async function(e){
        e.preventDefault();

        if (STATE.demo === "loading") return;

        STATE.demo = "loading";
        setStatus("demoStatus", "Processing request...");

        const data = {
            name: demoForm[0].value,
            email: demoForm[1].value,
            message: demoForm[2].value
        };

        try {
            // Placeholder for n8n webhook
            await new Promise(res => setTimeout(res, 800));

            STATE.demo = "success";
            setStatus(
                "demoStatus",
                "Request logged. Operion will respond.",
                "success"
            );

            demoForm.reset();

        } catch (err){
            STATE.demo = "error";
            setStatus(
                "demoStatus",
                "Submission failed. Retry.",
                "error"
            );
        }
    });
}

// ---------- ONBOARDING FORM ----------
const onboardForm = document.getElementById("onboardForm");

if (onboardForm){
    onboardForm.addEventListener("submit", async function(e){
        e.preventDefault();

        if (STATE.onboard === "loading") return;

        // VALIDATION
        if (!validateCheckboxes(onboardForm)){
            setStatus(
                "onboardStatus",
                "All legal confirmations required.",
                "error"
            );
            return;
        }

        STATE.onboard = "loading";
        setStatus("onboardStatus", "Validating configuration...");

        const data = {
            business_name: onboardForm[0].value,
            owner_name: onboardForm[1].value,
            email: onboardForm[2].value,

            services: onboardForm[3].value,
            tone: onboardForm[4].value,

            smtp_host: onboardForm[5].value,
            smtp_user: onboardForm[6].value,
            smtp_pass: onboardForm[7].value
        };

        try {
            // Placeholder for:
            // 1. Neon DB insert
            // 2. Stripe session creation
            // 3. n8n activation trigger

            await new Promise(res => setTimeout(res, 1200));

            STATE.onboard = "success";

            setStatus(
                "onboardStatus",
                "Configuration accepted. Redirecting to payment...",
                "success"
            );

            // Future:
            // window.location.href = stripe_url;

        } catch (err){
            STATE.onboard = "error";

            setStatus(
                "onboardStatus",
                "Configuration failed. Check inputs.",
                "error"
            );
        }
    });
}

// ---------- SYSTEM LOCK (PREVENT RANDOM EXECUTION) ----------
Object.freeze(STATE);
