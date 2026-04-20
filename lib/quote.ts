import quoteData from "@/data/quote.json";

export type Quote = {
  text: string;
  author: string;
  context: string;
};

export function getQuote(): Quote {
  return quoteData as Quote;
}