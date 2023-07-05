declare module 'reading-time/lib/reading-time' {
  export interface WordCountStats {
    total: number;
  }
  export interface ReadingTimeResults {
    text: string;
    minutes: number;
    time: number;
    words: WordCountStats;
  }
  export default function readingTime(text: string): ReadingTimeResults;
}
