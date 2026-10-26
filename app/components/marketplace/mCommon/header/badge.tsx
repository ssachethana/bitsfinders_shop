/** Small counter bubble with a pop-in animation (re-pops whenever n changes). */
export default function Badge({ n }: { n: number }) {
  return (
    <span
      key={n}
      className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-1 text-[10px] font-bold leading-none text-black"
      style={{ animation: "bs-pop 0.4s ease-out" }}
    >
      {n > 99 ? "99+" : n}
    </span>
  );
}