class AnalyticsRepository {
    async getBookingStats(shopId, startDate, endDate) {
        throw new Error('Method not implemented');
    }
    
    async getRevenueStats(shopId, startDate, endDate) {
        throw new Error('Method not implemented');
    }
    
    async getServicePopularityStats(shopId, startDate, endDate) {
        throw new Error('Method not implemented');
    }
}

module.exports = AnalyticsRepository;