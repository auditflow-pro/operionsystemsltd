// ============================================================
// OPERION FRONTEND CONTROLLER
// GitHub Pages + n8n Webhook Integration
// ============================================================

// 🔒 OPERION WEBHOOK ENDPOINT (YOUR LIVE URL)
const OPERION_ENDPOINT = "https://nonrhymed-elmer-chrysocarpous.ngrok-free.dev/webhook/operion/demo-request";


// ============================================================
// DEMO FORM HANDLER
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("demoForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);

    const payload = {
      source: "operion_demo_request",
      intent: "demo_request",
      timestamp: new Date().toISOString(),

      business_name: formData.get("business_name"),
      contact_name: formData.get("contact_name"),
      email: formData.get("email"),
      enquiry: formData.get("enquiry")
    };

    // UI feedback (optional but safe)
    const button = form.querySelector("button");
    const originalText = button.innerText;

    button.disabled = true;
    button.innerText = "Processing...";

    try {

      const response = await fetch(OPERION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Webhook failed");
      }

      // Success
      alert("Operion received your enquiry.");
      form.reset();

    } catch (error) {

      console.error("Operion error:", error);
      alert("Submission failed. Please try again.");

    } finally {

      button.disabled = false;
      button.innerText = originalText;

    }
  });

});
