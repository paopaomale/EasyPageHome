define(['shared/js/client'], function (BaseClient) {
    return _.extend(BaseClient, {
    	// DETAIL_URL: BaseClient.basePath + '/info/detail',
    	DETAIL_URL: '../main/data/main-listview.json',
    })
})