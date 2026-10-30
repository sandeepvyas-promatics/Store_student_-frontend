import Link from "next/link";
import Icon from "./Icon";

export default function Empty({ icon = "box", title, text, href, cta }: { icon?: string; title: string; text: string; href?: string; cta?: string }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-wash text-muted"><Icon name={icon} className="h-6 w-6" /></span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted">{text}</p>
      {href && cta && <Link href={href} className="btn btn-dark mt-6">{cta}</Link>}
    </div>
  );
}
