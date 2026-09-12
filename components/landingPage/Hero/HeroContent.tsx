import { FaArrowRight } from "react-icons/fa6";

export default function HeroContent() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-5xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-white mb-6">
        <span className="block overflow-hidden pb-2">
          <span className="block reveal-text opacity-0 origin-bottom-left">
            The Next Era of
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span className="block reveal-text opacity-0 origin-bottom-left">
            <span className="text-primary font-semibold">Sustainable</span>{" "}
            Power.
          </span>
        </span>
      </h1>

      <p className="reveal-fade opacity-0 text-base md:text-xl font-light text-white/90 leading-relaxed max-w-xl mb-10">
        Transforming geothermal resources into reliable energy, green hydrogen,
        and sustainable lithium for a zero-carbon economy.
      </p>

      <div className="reveal-fade opacity-0">
        <button
          type="button"
          className="group flex items-center gap-5 bg-primary text-white font-medium px-7 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white hover:text-primary shadow-lg shadow-black/20"
        >
          Explore Solutions
          <span className="relative flex items-center justify-center h-8 w-8 rounded-full bg-white text-primary group-hover:bg-primary group-hover:text-white overflow-hidden transition-colors duration-300">
            <span className="absolute transition-transform duration-300 group-hover:translate-x-[150%]">
              <FaArrowRight size={14} />
            </span>
            <span className="absolute translate-x-[-150%] transition-transform duration-300 group-hover:translate-x-0">
              <FaArrowRight size={14} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
