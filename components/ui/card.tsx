import { ReactNode } from "react";

type Props = { title: string; children: ReactNode };

export const Card = ({ title, children }: Props) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </div>
  );
};
