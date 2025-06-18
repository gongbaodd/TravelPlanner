import { IQuotation, IQuote, ILocalGuide, IppPrice, IGroupPrice } from '../types';

export const calculateQuotationTotals = (quotation: IQuotation) => {
  const { allNum, leadNum, quotes } = quotation;

  // Hotel calculation
  const hotelSum = allNum * quotes.reduce((sum, quote) => {
    return sum + quote.hotel.ppPrice.count + 
           (quote.hotel.singleRoom.count * quote.hotel.singleRoom.ppPrice.count);
  }, 0);

  // Transport calculation
  const transportSum = quotes.reduce((sum, quote) => {
    const transportCost = quote.transportCost.count;
    const localGuideTip = isPersonTip(quote.localGuide.tip) 
      ? quote.localGuide.tip.count * (allNum - 1) / 2
      : quote.localGuide.tip.count / 2;
    return sum + transportCost + localGuideTip;
  }, 0);

  // Meal calculation
  const mealSum = allNum * quotes.reduce((sum, quote) => {
    const breakfast = quote.meals.breakfast?.ppPrice.count || 0;
    const lunch = quote.meals.lunch?.ppPrice.count || 0;
    const dinner = quote.meals.dinner?.ppPrice.count || 0;
    return sum + breakfast + lunch + dinner;
  }, 0);

  // Local guide meal calculation
  const localGuideMealSum = quotes.reduce((sum, quote) => {
    return sum + quote.localGuide.meal.count;
  }, 0);

  // Attraction calculation
  const attractionSum = allNum * quotes.reduce((sum, quote) => {
    return sum + quote.attractions.ppPrice.count;
  }, 0);

  // Guide calculation
  const guideSum = quotes.reduce((sum, quote) => {
    return sum + quote.guide.count;
  }, 0);

  // Local guide calculation
  const localGuideSum = quotes.reduce((sum, quote) => {
    const salary = quote.localGuide.salary.count;
    const tip = isPersonTip(quote.localGuide.tip)
      ? quote.localGuide.tip.count * (allNum - 1) / 2
      : quote.localGuide.tip.count / 2;
    return sum + salary + tip;
  }, 0);

  // Local guide accommodation calculation
  const localGuideAccSum = quotes.reduce((sum, quote) => {
    return sum + quote.localGuide.accomadation.count;
  }, 0);

  // Water calculation
  const waterSum = (allNum - leadNum) * quotes.reduce((sum, quote) => {
    return sum + quote.water.count;
  }, 0);

  const totalSum = hotelSum + transportSum + mealSum + localGuideMealSum + 
                   attractionSum + guideSum + localGuideSum + localGuideAccSum + waterSum;

  return {
    hotelSum,
    transportSum,
    mealSum,
    localGuideMealSum,
    attractionSum,
    guideSum,
    localGuideSum,
    localGuideAccSum,
    waterSum,
    totalSum
  };
};

const isPersonTip = (tip: IppPrice | IGroupPrice): tip is IppPrice => {
  return tip.type === "Person";
};