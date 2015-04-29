/**
 * 
 */

angular.module('bookingApp',[]).service('instantBookingService',['$http',function($http){
	
	return {
		
		selectedDate : null,
		getDropDownData: function(getDropDownDataSuccessCallback, getDropDownDataFailureCallback){
			$http({
       		 
       		 	method: 'GET',
                cache: false,
                headers: { 'Content-Type': 'application/json' },
                url: 'booking-drop-down',
                params : {}
             }).
            success(function (response) {
            	getDropDownDataSuccessCallback(response)
            }).
            error(function (response) {
            	getDropDownDataFailureCallback(response)
            });
		},
		sanitizeParam : function(event){
			console.log(event);
			var param = {};
			param = {
				'name' : event.name,
				'email' : event.email,
				'contact_no' : event.contactNo,
				'location': event.location.selected,
				'location_nid': event.location.options[0].value,
				'sport' : event.sports.selected,
				'slot' : event.slots.selected,
				'slots_nid' : event.slots.options[0].slots_nid,
				'slotTime' : event.time.selected,
				'price' : event.price,
				'description' : event.description,
				'start_date' : event.startDate,
				'date' : event.startDate,
					
			};
			return param;
			
		},
		saveNodeEvent : function(event, saveNodeEventSuccessCallback, saveNodeEventFailureCallback){
			$http({
				method: 'POST',
				cache: false,
				headers: { 'Content-Type': 'application/json' },
                url: 'save-node-event',
                data : this.sanitizeParam(event)
			}).
			success(function(response){
				saveNodeEventSuccessCallback(response);
			}).
			error(function(response){
				saveNodeEventFailureCallback(response);
			});
			
		},
		getSelectedDateByCalendarApp : function(){
			return localStorage.selectedDate;
		},
		setSelectedDateByCalendarApp : function(selectedDate){
			this.selectedDate = selectedDate;
		}
		
	}
	
}]);




angular.module('bookingApp').factory('dropdownresponse', function(){
		
		return{
			dropdown : null,
			location : null,
			sports	 : null,
			slots	 : null,
			slotsTime: null,
			slotsPrice : null,
			getDropdown : function(){
				return this.dropdown;
			},
			setDropdown : function(dropdown){
				this.dropdown = dropdown;
			}, 
			getLocation : function(){
				if(this.dropdown){
					this.location = [];
					this.sports = [];
					this.slots = [];
					this.slotsTime = [];
					this.slotsPrice = [];
					for(nodes in this.dropdown){
						var nodeArray = this.dropdown[nodes];
						for(i in nodeArray){
							var node = nodeArray[i].node;
							console.log('node', node);
							this.location.push(
								{
									'name' : node.location,
									'value' : node.location_nid
								}
							);
							
							this.sports.push(
								{
									'name'  : node.sports,
									'value' : node.location_nid 
								}
							);
							this.slots.push(
								{
									'name'  : node.slot,
									'value' : node.sports,
									'slots_nid' : node.slots_nid
								}
							);
							this.slotsTime.push(
								{
									'name'  : node.time,
									'value' : node.slot 
								}
							);
							this.slotsPrice.push(
								{
									'name'  : node.price,
									'value' : node.time 
								}
							);	
							
							
						}
						this.setSports(this.sports);
						this.setSlots(this.slots);
						this.setSlotsTime(this.slotsTime);
						this.setSlotsPrice(this.slotsPrice);
						
					}
					
				}
				return this.removeDuplicates(this.location);				
			},
			getSports : function(sport){
				if(!location){
					return this.sports;
				}
				
				var sportsFilter = this.sports.filter(function(sportObj){
						return sportObj.value == sport;
				});
								
				sportsFilter = this.removeDuplicates(sportsFilter);
				
				var sportsRevised = [];
				for(i in sportsFilter){
					sportsRevised.push(
							{
								'name' : sportsFilter[i].name, 
								'value' : sportsFilter[i].name
							}
					);
				}
				
				return sportsRevised;
				
			}, 
			setSports : function(sports){
				this.sports = sports;
			},
			getSlots : function(slots){
				if(!slots){
					return this.slots;
				}
				
				var slotsFilter = this.slots.filter(function(slotObj){
					return slotObj.value == slots;
				});
								
				var slotsRevised = [];
				for(i in slotsFilter){
					slotsRevised.push(
							{
								'name' : slotsFilter[i].name, 
								'value' : slotsFilter[i].name,
								'slots_nid' : slotsFilter[i].slots_nid
							}
					);
				}
				
				return slotsRevised;
				
			},setSlots : function(slots){
				this.slots = slots;
			},	
			getSlotsTime : function(slotsTime){
				if(!slotsTime){
					return slotsTime;
				}
				
				var slotsTimeFilter = this.slotsTime.filter(function(slotTimeObj){
					return slotTimeObj.value == slotsTime;
				});
								
				var slotsTimeRevised = [];
				for(i in slotsTimeFilter){
					slotsTimeRevised.push(
							{
								'name' : slotsTimeFilter[i].name, 
								'value' : slotsTimeFilter[i].name
							}
					);
				}
				return slotsTimeRevised;
				
				
			},
			setSlotsTime : function(slotsTime){
				this.slotsTime = slotsTime;
			},
			getSlotsPrice : function(slotsPrice){
				if(!slotsPrice){
					return this.slotsPrice.name;
				} 
				
				var slotsPriceFilter = this.slotsPrice.filter(function(slotPriceObj){
					return slotPriceObj.value == slotsPrice;
				});
					
				return slotsPriceFilter[0].name;
				
			},
			setSlotsPrice : function (slotsPrice){
				this.slotsPrice = slotsPrice;
			},
			removeDuplicates : function(arr){
				arr.sort( function( a, b){ return a.value - b.value; } );

				// delete all duplicates from the array
				for( var i=0; i<arr.length-1; i++ ) {
				  if ( arr[i].value == arr[i+1].value ) {
				    delete arr[i];
				  }
				}

				// remove the "undefined entries"
				arr = arr.filter( function( el ){ return (typeof el !== "undefined"); } );
				return arr;
			}
			
		}
	
});