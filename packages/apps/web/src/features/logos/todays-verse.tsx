import { notoSerifKr } from "~/components/fonts";
import { cn } from "~/lib/utils";

/**
 * @todo
 * - api
 * - links to bible providers
 * - toggle EN-KR
 */
export function TodaysVerse() {
  return (
    <div
      className={cn(
        "flex flex-col w-full my-2 text-center gap-y-2",
        notoSerifKr.className,
      )}
    >
      <p className="font-bold text-pretty text-xl italic">
        나는 의로운 중에 주의 얼굴을 보리니 깰 때에 주의 형상으로 만족하리이다
      </p>
      <p className="text-xs">시편 17:15 (개역한글)</p>
    </div>
  );
}
