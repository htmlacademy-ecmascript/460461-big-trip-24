export class Point {
  constructor({ id, type, destinationId, dateFrom, dateTo, basePrice, isFavorite = false, offerIds = [] }) {
    this.id = id;
    this.type = type;
    this.destinationId = destinationId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.basePrice = basePrice;
    this.isFavorite = isFavorite;
    this.offerIds = offerIds;
  }
}
