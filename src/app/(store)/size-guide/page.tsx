import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
};

const teeSizes = [
  { size: "XS", chest: '34-36"', length: '27"' },
  { size: "S", chest: '36-38"', length: '28"' },
  { size: "M", chest: '38-40"', length: '29"' },
  { size: "L", chest: '40-42"', length: '30"' },
  { size: "XL", chest: '42-44"', length: '31"' },
  { size: "XXL", chest: '44-46"', length: '32"' },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
        Sizing
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Size Guide</h1>
      <p className="text-muted-foreground text-sm mb-10">
        Our tees run true to size with a relaxed fit. If you prefer a more fitted look, size down.
        Measurements are in inches.
      </p>

      <h2 className="text-lg font-semibold mb-4">Tees</h2>
      <div className="rounded-2xl overflow-hidden border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left">
              <th className="px-5 py-3 font-semibold">Size</th>
              <th className="px-5 py-3 font-semibold">Chest</th>
              <th className="px-5 py-3 font-semibold">Length</th>
            </tr>
          </thead>
          <tbody>
            {teeSizes.map((row, i) => (
              <tr key={row.size} className={i % 2 === 0 ? "bg-background" : "bg-secondary/20"}>
                <td className="px-5 py-3 font-medium">{row.size}</td>
                <td className="px-5 py-3 text-muted-foreground">{row.chest}</td>
                <td className="px-5 py-3 text-muted-foreground">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 p-6 rounded-2xl bg-secondary/40">
        <h3 className="font-semibold mb-2">Hats</h3>
        <p className="text-sm text-muted-foreground">
          All hats are one-size with an adjustable closure to fit most head sizes.
        </p>
      </div>
    </div>
  );
}
