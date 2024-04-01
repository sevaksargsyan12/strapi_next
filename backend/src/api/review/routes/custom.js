module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/reviews',
      handler: 'review.reviewCreateBulk',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/reviewsByCompany/:companyId',
      handler: 'review.getReviewsByCompany',
      config: {
        auth: false
      }
    }
  ]
}
