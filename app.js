document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("demo-form");
  const responseBox = document.getElementById("demo-response");
  const submitBtn = document.getElementById("demo-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // UI state
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    responseBox.innerHTML = "";

    // Collect values
    const name = document.getElementById("demo-name").value;
    const email = document.getElementById("demo-email").value;
    const company = document.getElementById("demo-company").value;
    const message = document.getElementById("demo-message").value;

    try {
      const res = await fetch("https://nonrhymed-elmer-chrysocarpous.ngrok-free.dev/webhook/operion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          business: company,
          enquiry: message
        })
      });

      const data = await res.json();

      // Render response
      responseBox.innerHTML = `
        <div style="margin-top:1rem;padding:1rem;border:1px solid #00e5ff;border-radius:8px;">
          <strong>Operion Response:</strong><br><br>
          ${data.reply.replace(/\n/g, "<br>")}
        </div>
      `;

    } catch (err) {
      console.error(err);

      responseBox.innerHTML = `
        <div style="color:#ff6b6b;margin-top:1rem;">
          Submission failed. Check connection.
        </div>
      `;
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Process Enquiry →";
  });
});
