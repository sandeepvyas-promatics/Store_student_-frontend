// One place that decides the label and colour of every status in the store.
const map: Record<string, [string, string]> = {
  AVAILABLE: ["Available", "chip-ok"],
  RESERVED: ["Reserved", "chip-warn"],
  SOLD: ["Sold", "chip-mute"],
  HIDDEN: ["Hidden", "chip-mute"],
  AWAITING_PROOF: ["Waiting for payment proof", "chip-warn"],
  UNDER_REVIEW: ["Payment under review", "chip-info"],
  CONFIRMED: ["Payment confirmed", "chip-ok"],
  REJECTED: ["Payment rejected", "chip-bad"],
  PLACED: ["Placed", "chip-warn"],
  PAYMENT_REVIEW: ["Payment under review", "chip-info"],
  PAYMENT_CONFIRMED: ["Payment confirmed", "chip-ok"],
  PACKED: ["Packed", "chip-ok"],
  OUT_FOR_DELIVERY: ["Out for delivery", "chip-info"],
  DELIVERED: ["Delivered", "chip-ok"],
  CANCELLED: ["Cancelled", "chip-bad"],
  NEW: ["New", "chip-info"],
  ACCEPTED: ["Accepted", "chip-ok"],
  DECLINED: ["Declined", "chip-bad"],
  ACTIVE: ["Active", "chip-ok"],
  PAUSED: ["Paused", "chip-mute"],
};

export default function StatusChip({ status }: { status: string }) {
  const [label, cls] = map[status] ?? [status, "chip-mute"];
  return <span className={`chip ${cls}`}>{label}</span>;
}
