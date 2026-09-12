import { heroStats } from "@/data/hero-config";

export default function HeroStats() {
  return (
    <div className="hud-container opacity-0 relative z-10 w-full lg:px-20 px-6 md:px-12 pb-8 lg:pb-10">
      <div className="bg-brand-teal/8 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden w-full">
        <dl className="grid grid-cols-2 lg:grid-cols-5 w-full">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-item flex flex-col justify-between gap-3 p-5 lg:px-8 lg:py-8 opacity-0 border-white/10
                ${
                  index === 0
                    ? "col-span-2 lg:col-span-1 lg:border-r"
                    : "col-span-1 border-t lg:border-t-0 lg:border-r last:border-r-0"
                }
                ${index === 1 ? "border-r lg:border-r" : ""}
              `}
            >
              <dt className="text-[10px] md:text-xs font-semibold tracking-widest text-white/60 uppercase mb-3 whitespace-nowrap">
                {stat.label}
              </dt>
              <dd className="flex items-baseline gap-1.5">
                <span
                  className={`font-heading font-black tracking-tight text-white ${
                    stat.isPrimary ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"
                  }`}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest">
                    {stat.unit}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}