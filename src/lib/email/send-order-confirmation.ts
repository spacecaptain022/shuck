import { getResend } from "./resend";

export async function sendOrderConfirmation(
  to: string,
  orderId: string,
  customerName?: string | null
) {
  await getResend().emails.send({
    from: "SHUCK <orders@shuck.com>",
    to,
    subject: "Your SHUCK order is confirmed",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Order confirmed.</h1>
        <p style="color: #555; margin-bottom: 24px;">
          ${customerName ? `Hey ${customerName}, thanks` : "Thanks"} for your order.
          We'll get it out to you soon.
        </p>
        <p style="color: #888; font-size: 14px;">Order reference: <strong>${orderId}</strong></p>
      </div>
    `,
  });
}
