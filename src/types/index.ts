export interface IQuotation {
  allNum: number;
  leadNum: number;
  carType: string;
  singleRoomFactor: number;
  groupName: string;
  groupNumber: string;
  operator: string;
  date: Date;
  quotes: IQuote[];
  details: {
    transport: string;
    hotel: string;
    meal: string;
    attraction: string;
    guide: string;
    extra: string;
  };
}

export interface IQuote {
  date: Date;
  dayCount: number;
  cityName: string | "FLY" | "EMPTY DRIVING";
  transportCost: IPrice;
  hotel: {
    stars: number;
    reference: string;
    ppPrice: IppPrice;
    singleRoom: {
      count: number;
      ppPrice: IppPrice;
    };
  };
  meals: {
    breakfast: null | IMeal;
    lunch: null | IMeal;
    dinner: null | IMeal;
  };
  attractions: IAttraction;
  guide: IPrice;
  water: IppPrice;
  localGuide: ILocalGuide;
  extra: string;
}

export interface ILocalGuide {
  tip: IppPrice | IGroupPrice;
  salary: IPrice;
  accomadation: IPrice;
  meal: IPrice;
}

export interface IPrice {
  count: number;
  currency: "EUR";
}

export interface IGroupPrice extends IPrice {
  type: "Group";
}

export interface IppPrice extends IPrice {
  type: "Person";
}

export interface IMeal {
  ppPrice: IppPrice;
}

export interface IAttraction {
  name: string;
  ppPrice: IppPrice;
}

// Results interfaces
export interface IClientInfo {
  id?: string;
  companyName: string;
  address: string;
  tel: string;
  contactName: string;
  email: string;
}

export interface IGreatLineInfo {
  contactName: string;
  department: string;
  tel: string;
  email: string;
}

export type TGroupType = "single" | "series" | "business";

export interface IGroupInfo {
  number: string;
  name: string;
  startDate: Date;
  endDate: Date;
  type: TGroupType;
}

export interface IQuoteResult {
  ppPrice: number;
  currency: "EUR";
  content: string;
}

export interface IGroupQuote {
  quotes: IQuoteResult[];
  quoteDate: Date;
  validateDate: Date;
}

export interface IOffer {
  hotel: string;
  transport: string;
  meals: string;
  attractions: string;
  guides: string;
  tips: string;
  bottled_water: string;
}

export interface IHotel {
  checkInDate: Date;
  cityName: string;
  referenceHotel: string;
  nights: number;
  reviews: number;
}

export interface IAttractionResult {
  cityName: string;
  date: Date;
  content: string;
}

export type TMealType = "breakfast" | "lunch" | "dinner";

export interface IMeals {
  date: Date;
  type: TMealType;
  content: null | string;
}

export interface ILocalGuideResult {
  date: Date;
  cityName: string;
  working_hours: number | string;
  languages: string[];
}

export interface IService {
  date: Date;
  cityName: string;
  type: string;
  time: Date;
  itinerary: string;
  duration: null | string;
}

export interface IQuotationResults {
  id?: string;
  client: IClientInfo;
  greatLineInfo: IGreatLineInfo;
  groupInfo: IGroupInfo;
  groupQuote: IGroupQuote;
  offer: IOffer;
  hotels: IHotel[];
  attractions: IAttractionResult[];
  meals: IMeals[];
  localGuides: ILocalGuideResult[];
  services: IService[];
  calculations: {
    hotelSum: number;
    transportSum: number;
    mealSum: number;
    localGuideMealSum: number;
    attractionSum: number;
    guideSum: number;
    localGuideSum: number;
    localGuideAccSum: number;
    waterSum: number;
    totalSum: number;
  };
}

export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface IQuotationListItem {
  id: string;
  clientName: string;
  groupName: string;
  totalCost: number;
  createdDate: Date;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
}