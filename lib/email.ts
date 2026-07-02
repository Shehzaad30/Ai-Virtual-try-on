type WaitlistLead = {
  name: string;
  contact: string;
  shopType?: string | null;
  city?: string | null;
};

/**
 * Emails the founder when a shop owner joins the waitlist.
 * Uses Resend's REST API (no SDK dependency). If email isn't configured
 * (no API key / no recipient), it silently no-ops so signups never break.
 */
export async function sendWaitlistNotification(lead: WaitlistLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_EMAIL;
  const from = process.env.WAITLIST_FROM_EMAIL || "Drapify <onboarding@resend.dev>";

  // Not configured yet — skip without failing the signup.
  if (!apiKey || !to) return;

  const rows = [
    ["Name", lead.name],
    ["Contact", lead.contact],
    ["Shop type", lead.shopType || "—"],
    ["City", lead.city || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#555">${k}</td><td style="padding:6px 12px">${v}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px">
      <h2 style="color:#7c3aed;margin-bottom:4px">New Drapify shop signup 🎉</h2>
      <p style="color:#555;margin-top:0">A shop owner just joined the waitlist.</p>
      <table style="border-collapse:collapse;background:#faf9ff;border-radius:8px">${rows}</table>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New Drapify shop signup: ${lead.name}`,
      html,
    }),
  });

  if (!res.ok) {
    // Log server-side but do not throw — the signup already succeeded.
    console.error("waitlist email failed:", res.status, await res.text());
  }
}
