'use strict';

/**
 * review controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review',({ strapi }) => ({
  async reviewCreateBulk(ctx) {
    try {
      const reviews = ctx.request.body;
      let companyId = '';

      if(reviews) {
        companyId = reviews[0].companyId;
      }

      if(companyId) {
        await strapi.db.query("api::review.review").deleteMany({
          where: {
            companyId,
          }
        })
      }

      const response = await strapi.db.query("api::review.review").createMany({
        data: reviews,
      });
      return response

    } catch (e) {
      ctx.body = e
    }
  },
  async getReviewsByCompany(ctx) {
    try {
      const { companyId } = ctx.request.params;
      const { limit, start } = ctx.request.query;
      const count = await strapi.db.query("api::review.review").count({
        where: {
          companyId,
        }
      });

      if(companyId) {
        const response = await strapi.db.query("api::review.review").findMany({
          where: {
            companyId,
          },
          limit: parseInt(limit) || 10, // Default limit to 10 if not provided
          offset: parseInt(start) || 0, // Default offset to 0 if not provided
          orderBy: { date: 'desc' },
        })

        if(!Object.keys(response)?.length) {
          ctx.badRequest('Not found')
        }

        return { data: response, totalCount: count, success: true }
      }

    } catch (e) {
      ctx.body = e
    }
  }
}));
