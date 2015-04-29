/**
 * 
 */

calendarService = angular.module("angularjsCalendar",['bookingApp']);

calendarService.service('calendarService', ['instantBookingService', function(instantBookingService){
	
	var service = {};
	
	service.selectedDate = null;
	
	service.getSelectedDate = function(){
		return this.selectedDate;
	}
	
	service.setSelectedDate = function(selectedDate){
		this.selectedDate = selectedDate;
		localStorage.selectedDate = selectedDate
		instantBookingService.setSelectedDateByCalendarApp(selectedDate);
	}
	
	return service;
	
}]);
