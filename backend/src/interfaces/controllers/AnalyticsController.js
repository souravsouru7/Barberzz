class AnalyticsController {
    constructor(getShopAnalyticsUseCase) {
      this.getShopAnalyticsUseCase = getShopAnalyticsUseCase;
    }
  
    async getShopAnalytics(req, res) {
      try {
        const { shopId } = req.params;
        const { startDate, endDate } = req.query;
  
        const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
        const end = endDate ? new Date(endDate) : new Date();
  
        const analytics = await this.getShopAnalyticsUseCase.execute(shopId, start, end);
  
        res.json({
          success: true,
          data: analytics
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    }
  }
  
  module.exports = AnalyticsController;