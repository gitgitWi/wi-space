import { Nanum_Myeongjo, Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';

export const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });

export const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
});

export const nanumMj = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});
