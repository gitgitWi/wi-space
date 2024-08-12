import { Clock } from "~/features/clock";
import { TodaysVerse } from "~/features/logos";

export default function Home() {
  return (
    <main className="flex flex-col justify-start items-center gap-y-4 p-24 min-h-screen">
      <section className="w-full">
        <div className="flex flex-row justify-between items-baseline gap-x-2 w-full">
          <h1 className="flex font-bold text-left">Wi space</h1>
          <Clock />
        </div>
      </section>

      <section className="flex flex-col w-full">
        <TodaysVerse />
      </section>
    </main>
  );
}
