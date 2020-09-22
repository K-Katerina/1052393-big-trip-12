import DestinationsModel from "./model/destination";

export const TYPE_TRIP_ITEM_TO = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const TYPE_TRIP_ITEM_IN = [`check-in`, `sightseeing`, `restaurant`];

export const typeTripItem = [...TYPE_TRIP_ITEM_TO, ...TYPE_TRIP_ITEM_IN];

export const FILTER = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SORT = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const UserAction = {
  ADD: `ADD`,
  UPDATE: `UPDATE`,
  DELETE: `DELETE`
};

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

const typeDefault = typeTripItem[0];

const DEFAULT_COST = 100;

export const getBlackTrip = () => {
  return {
    id: null,
    type: typeDefault,
    city: DestinationsModel.getDestinations()[0].city,
    timeBegin: new Date(),
    timeEnd: new Date(new Date().setHours(new Date().getHours() + 1)),
    cost: DEFAULT_COST,
    isFavorite: false,
    offers: [],
    destination: {
      desc: DestinationsModel.getDestinations()[0].destination,
      photo: DestinationsModel.getDestinations()[0].photo
    }
  };
};

export const SORT_DEFAULT = SORT.EVENT;

export const FILTER_DEFAULT = FILTER.EVERYTHING;

export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`, `July`, `Aug`, `Sept`, `Oct`, `Nov`, `Dec`];

export const getInOrTo = (type) => TYPE_TRIP_ITEM_IN.indexOf(type) > 0 ? `in` : `to`;
