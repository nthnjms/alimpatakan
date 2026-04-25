import wordData from "@/data/word.json";

export type Word = {
  word: string;
  pronunciation: string;
  language: string;
  part_of_speech: string;
  definition: string;
  usage: string;
  usage_translation: string;
  etymology: string;
  note: string;
};

export function getWord(): Word {
  return wordData as Word;
}