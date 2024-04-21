export interface CountryType {
  name: string;
  code: string;
  symbol: string;
  flag?: string;
}

export interface ChildProps {
  sendDataToParent: (data: CountryType | null) => void;
  selectFrom: CountryType | null;
selectTo: CountryType |null
}

export interface HeroChildProps {
     sendDataToParent: (data: CountryType | null) => void;
}