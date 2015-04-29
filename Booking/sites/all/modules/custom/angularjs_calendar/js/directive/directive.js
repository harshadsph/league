/**
 * 
 */

calendar = angular.module("angularjsCalendar");

calendar.directive('titleButton',function(){
	
	var directive ={};
	
	directive.restrict = 'E';
	
	directive.templateUrl = '/sites/all/modules/custom/angularjs_calendar/template/model-month.html';
	
	directive.link = function(scope, element, attrs){
		scope.selectMonth = function(month){
			scope.titleMonth = month;
			scope.titleDate = moment([scope.titleYear, month]).format('MMMM YYYY');
			scope.userDate = moment([scope.titleYear, month]);	
			angular.element("#MONTHMODEL").modal("hide");
			angular.element('body').removeClass('modal-open');
			angular.element('.modal-backdrop').remove();
			
		}
		
		scope.selectYear = function(year){
			if(!year && year != 0){
				scope.titleYear = Number(moment().format('YYYY'));
				scope.titleMonth = Number(moment().format('MM'))-1;
			}else{
				scope.titleYear = scope.titleYear + year;
			}			
			scope.titleDate = moment([scope.titleYear, scope.titleMonth]).format('MMMM YYYY');
			scope.userDate = moment([scope.titleYear, scope.titleMonth]);	
			angular.element("#MONTHMODEL").modal("hide");
			angular.element('body').removeClass('modal-open');
			angular.element('.modal-backdrop').remove();
		}
	}
	
	return directive;
	
});

calendar.directive('angularjsCalendar', ['$compile', '$parse', 'calendarService',function($compile, $parse, calendarService){
	
		var directive = {};
	
		directive.restrict = 'A';
		
		directive.controller = function($scope, $attrs){
			
			$scope.prevSelectedDay = null;
			
			$scope.selectDate = function(day){
				if($scope.prevSelectedDay != day){
					var model = $parse('userClicked'+$scope.prevSelectedDay);
					model.assign($scope, false);
					$scope.prevSelectedDay = day;
				}				
				var model = $parse('userClicked'+day);
				model.assign($scope, true);
				
				calendarService.setSelectedDate(day+"-"+$scope.titleMonth+"-"+$scope.titleYear);
				
				
			}
			
			$scope.updateCalendar = function(userDate){				
				var container = '<div class="container">';
				var title = '<h3><span class="label label-default"><b>{{titleDate}} </b></span> ';
				title += '<title-button/> </h3>';
				var header ='<table class="table table-bordered">';
				header +='<thead>';
				header +='<tr>';
				header +='<th> S </th>';
				header +='<th> M </th>';
				header +='<th> T </th>';
				header +='<th> W </th>';
				header +='<th> T </th>';
				header +='<th> F </th>';
				header +='<th> S </th>';						
				header +='</tr>';
				header += '</thead>';	
				
				
				var body = '<tbody>';
				var day = 1;
				var k = 1;
				var calendarDate = userDate.clone();
				
				var firstDayOfMOnth = Number(calendarDate.startOf('month').day())+1;
				var lastDayOfMonth = Number(calendarDate.endOf('month').format('DD'));	
				var currentDayOfMonth = Number(moment().format('DD'));
				var totalDays = (firstDayOfMOnth + lastDayOfMonth)-1;
				for(var i=1; i<=totalDays; ){
					body += '<tr>';
						for(var j=0; j<7;j++){
							
							body += '<td ng-class="{\'user-clicked\':userClicked'+day+'}">';					
							if((i<=totalDays) && (i >= firstDayOfMOnth)){
								if(currentDayOfMonth == day){
									body += '<span class="active"><a class="calendar-a" href="javascript:void(0)" ng-click="selectDate('+day+')">'+ day++ +'</a></span>';
								}else{
									body += '<span><a class="calendar-a" href="javascript:void(0)" ng-click="selectDate('+day+')">'+ day++ +'</a></span>';
								}
								/*body += '<a href="#"><span class="glyphicon glyphicon-info-sign"></span></a>';*/
								
							}	
							i++;
							body += '</a></td>';
						}
					body += '</tr>';
				}
				body += '</tbody>';
				var footer = '<button type="button" class="btn btn-primary button-title" ng-click="updateDate()">Current Day</button>';//'<ul class="pager"><li class="previous"><a href="#">Previous</a></li><li class="next"><a href="#">Next</a></li></ul>';
				return container+ title + header + body + '</table>'+ footer +'</div>';
			}
			
			$scope.updateDate = function(userDate){
				if(!userDate){
					userDate = moment();
				}
				$scope.titleDate = userDate.format('MMMM YYYY');
				$scope.userDate = userDate;				
			}
		}
		
		directive.link = function(scope, element, attr){
				
				scope.titleYear =  Number(moment().format('YYYY'));
				scope.titleMonth = Number(moment().format('MM'))-1;
				scope.titleDate =  moment().format('MMMM YYYY');
				scope.$watch( function(){
					return scope.userDate;
				}, function(newVal, oldVal){
						if(!newVal){
							newVal = moment();
						}			
						element.html(scope.updateCalendar(newVal));
						$compile(element.contents())(scope);					
				});			
		}			
		
		return directive;
}]);