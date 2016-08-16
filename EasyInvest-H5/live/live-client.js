define(['shared/js/client'], function (BaseClient) {
    return _.extend(BaseClient, {
        // SCHEDULE_URL: BaseClient.basePath + '/broadcast/schedule',
        SCHEDULE_URL: '../live/data/schedule.json',
        // BOOKING_URL: BaseClient.basePath + '/broadcast/booking',
        BOOKING_URL: '../live/data/booking.json'
    })
})