"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FulfillmentStatus = "unfulfilled" | "processing" | "shipped" | "delivered" | "cancelled";

interface FulfillmentFormProps {
  orderId: string;
  fulfillmentStatus: string;
  trackingNumber: string;
  trackingCarrier: string;
}

export function FulfillmentForm({
  orderId,
  fulfillmentStatus: initialStatus,
  trackingNumber: initialTracking,
  trackingCarrier: initialCarrier,
}: FulfillmentFormProps) {
  const [status, setStatus] = useState<FulfillmentStatus>(
    initialStatus as FulfillmentStatus
  );
  const [trackingNumber, setTrackingNumber] = useState(initialTracking);
  const [trackingCarrier, setTrackingCarrier] = useState(initialCarrier);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fulfillmentStatus: status, trackingNumber, trackingCarrier }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const json = await res.json();
        alert(json.error ?? "Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-border p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
        Fulfillment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as FulfillmentStatus)}
            className="h-8 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
          >
            <option value="unfulfilled">Unfulfilled</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Tracking Number</label>
          <Input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g. 1Z999AA10123456784"
            className="rounded-2xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Carrier</label>
          <Input
            value={trackingCarrier}
            onChange={(e) => setTrackingCarrier(e.target.value)}
            placeholder="e.g. UPS, FedEx, USPS"
            className="rounded-2xl"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving} className="rounded-2xl">
            {saving ? "Saving..." : "Save Fulfillment"}
          </Button>
          {saved && (
            <span className="text-sm text-muted-foreground">Saved.</span>
          )}
        </div>
      </form>
    </div>
  );
}
