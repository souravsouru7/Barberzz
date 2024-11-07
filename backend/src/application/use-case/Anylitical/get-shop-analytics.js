class GetShopAnalyticsUseCase {
    constructor(analyticsRepository) {
      this.analyticsRepository = analyticsRepository;
    }
  
    async execute(shopId, startDate, endDate) {
      const [bookingStats, revenueStats, serviceStats] = await Promise.all([
        this.analyticsRepository.getBookingStats(shopId, startDate, endDate),
        this.analyticsRepository.getRevenueStats(shopId, startDate, endDate),
        this.analyticsRepository.getServicePopularityStats(shopId, startDate, endDate)
      ]);
  
      return {
        bookingStats,
        revenueStats,
        serviceStats
      };
    }
  }
  
  module.exports = GetShopAnalyticsUseCase;