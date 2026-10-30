import Icon from "@/components/ui/Icon";

export default function StatCard({ label, value, note, icon, alert }: { label: string; value: string; note?: string; icon: string; alert?: boolean }) {
  return (
    <div className={`card card-pad ${alert ? "border-tag/60 bg-tagsoft/50" : ""}`}>
      <div className="flex items-center justify-between text-sm text-muted">{label}<Icon name={icon} className="h-4 w-4" /></div>
      <p className="display mt-3 text-3xl">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}
