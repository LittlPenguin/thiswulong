// globals.d.ts
declare namespace Intl {
  interface SegmenterOptions {
    granularity?: "grapheme" | "word" | "sentence";
  }

  interface SegmentData {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
  }

  class Segmenter {
    constructor(locales?: string | string[], options?: SegmenterOptions);
    static supportedLocalesOf(
      locales?: string | string[],
      options?: any
    ): string[];
    segment(input: string): IterableIterator<SegmentData>;
  }
}
