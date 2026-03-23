// ============================================================
// OPERION FRONTEND CONTROLLER
// GitHub Pages + n8n Webhook Integration (V21 Aligned)
// ============================================================

// 🔒 OPERION WEBHOOK ENDPOINT
const OPERION_ENDPOINT = "https://nonrhymed-elmer-chrysocarpous.ngrok-free.dev/webhook/operion/demo-request";


// ============================================================
// DEMO FORM HANDLER
// Matches demo.html EXACTLY (no assumptions)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("demo-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // 🔧 RAW INPUT (no fake structure)
    const payload = {
      source: "operion_demo_request",
      timestamp: new Date().toISOString(),

      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      business_type: formData.get("business_type"),
      employees: formData.get("employees"),
      message: formData.get("message")
    };

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

      // ✅ UI response (non-intrusive)
      const responseBox = document.getElementById("demo-response");
      if (responseBox) {
        responseBox.innerHTML = "<div class='alert alert-success'>Operion has processed your enquiry.</div>";
      }

      form.reset();

    } catch (error) {

      console.error("Operion error:", error);

      const responseBox = document.getElementById("demo-response");
      if (responseBox) {
        responseBox.innerHTML = "<div class='alert alert-error'>Submission failed. Check connection.</div>";
      }

    } finally {

      button.disabled = false;
      button.innerText = originalText;

    }
  });

});
