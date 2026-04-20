module.exports = async function(request) {
  try {
    const payload = await request.json();
    const { name, userEmail, type, message } = payload;
    
    // We expect RESEND_API_KEY to be available in environment variables
    // In InsForge, secrets are available as process.env equivalent or via global config
    const apiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY in backend secrets" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: "Ledger Knox <onboarding@resend.dev>",
        to: ["developer@nullcove.com"],
        subject: `New Contact Message: ${type}`,
        html: `
          <h1>New Message from Ledger Knox</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Type:</strong> ${type}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
    });

    const result = await response.json();
    console.log("Resend API Response:", result);
    
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Function Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
