import Icon from "@/components/ui/Icon";

const saved = [
  { label: "PG", lines: "Room 214, Sunrise PG, Model Town", extra: "Near the main gate · Ludhiana 141002", def: true },
  { label: "Home", lines: "House 18, Sarabha Nagar", extra: "Ludhiana 141001", def: false },
];

export default function Addresses() {
  return (
    <>
      <h1 className="page-title">Saved addresses</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {saved.map((a) => (
          <div key={a.label} className="card card-pad">
            <div className="flex items-center justify-between"><p className="flex items-center gap-2 font-medium"><Icon name="pin" className="h-4 w-4" /> {a.label}</p>{a.def && <span className="chip chip-info">Default</span>}</div>
            <p className="mt-3 text-sm text-muted">{a.lines}<br />{a.extra}</p>
            <div className="mt-4 flex gap-4 text-sm"><button className="font-medium underline underline-offset-4">Edit</button><button className="text-muted hover:text-bad">Remove</button></div>
          </div>
        ))}
      </div>

      <form className="card card-pad mt-8">
        <h2 className="text-lg font-semibold">Add a new address</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div><label className="label" htmlFor="lb">Label</label><input id="lb" className="input" placeholder="PG, Hostel, Home" /></div>
          <div><label className="label" htmlFor="rm">Room number</label><input id="rm" className="input" /></div>
          <div className="sm:col-span-2"><label className="label" htmlFor="ad">Hostel, PG or street address</label><input id="ad" className="input" /></div>
          <div><label className="label" htmlFor="lm">Landmark</label><input id="lm" className="input" /></div>
          <div><label className="label" htmlFor="pc">Pincode</label><input id="pc" className="input" inputMode="numeric" /></div>
        </div>
        <button className="btn btn-dark mt-6">Save address</button>
      </form>
    </>
  );
}
