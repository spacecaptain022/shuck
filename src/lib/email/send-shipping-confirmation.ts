import { getResend } from "./resend";

export async function sendShippingConfirmation(
  to: string,
  orderId: string,
  trackingNumber: string,
  trackingCarrier: string,
  customerName?: string | null
) {
  await getResend().emails.send({
    from: "SHUCK <orders@shuck.com>",
    to,
    subject: "Your SHUCK order has shipped",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Your order is on its way.</h1>
        <p style="color: #555; margin-bottom: 24px;">
          ${customerName ? `Hey ${customerName} — it` : "It"}'s packed up and shipped.
        </p>
        <div style="background: #f5f0eb; border-radius: 16px; padding: 20px 24px; margin-bottom: 24px;">
          <p style="color: #888; font-size: 13px; margin: 0 0 4px;">Tracking number</p>
          <p style="font-weight: 600; font-size: 16px; margin: 0;">${trackingNumber}</p>
          <p style="color: #888; font-size: 13px; margin: 8px 0 0;">via ${trackingCarrier}</p>
        </div>
        <p style="color: #888; font-size: 14px;">Order reference: ${orderId}</p>
      </div>
    `,
  });
}
