import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="relative h-full w-full max-w-[325px] pb-4 pr-4">
      <div className="relative h-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border-b-2 border-r-2 border-red-400"
        />

        <div className="relative flex h-full flex-col border border-neutral-300 bg-[#f3efe8] shadow-sm">
          <div className="relative min-h-0 w-full flex-1 overflow-hidden">
            <Image
              className="h-full w-full object-cover object-top"
              src="/images/image.png"
              width={400}
              height={800}
              alt="Portrait"
            />
          </div>

          <div className="grid shrink-0 grid-cols-2 border-t border-neutral-300 px-3 py-3 font-mono text-[9.5px] font-normal uppercase text-neutral-500">
            <div>
              Based in Dhaka, <br /> Bangladesh
            </div>
            <div className="self-center text-right">2024 - present</div>
          </div>
        </div>
      </div>
    </div>
  );
}