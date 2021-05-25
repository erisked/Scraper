class productRatingData {
    constructor(name, description, noOfReviews, averageRating) {
      this.name = name;
      this.description = description;
      this.noOfReviews = noOfReviews;
      this.averageRating = averageRating
    }
  }

  module.exports = {
    productRatingData: productRatingData
}