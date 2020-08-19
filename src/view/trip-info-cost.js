export const createTripInfoCost = (tripItemArray) => {
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value"> ${tripItemArray.reduce((a, b) => a + b.cost, 0)}</span>
    </p>
  `);
};
