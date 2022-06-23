Vue.component("facilities", { 
	data: function () {
	    return {
	      facilities: [],
	      openstatus: '',
	      searchname: '',
	      searchtype: '',
	      searchlocation: '',
	      searchrating: '',
	      searchstatus: '',
	      
	      srchname: '',
	      srchtype: '',
	      srchloc: '',
	      srchrat: '',
		  mode: '', 
		  
		  columnToBeSorted: [],
		  sortDirectionName: 'ASC',
		  sortDirectionLocation: 'ASC',
		  sortDirectionRating: 'ASC'
	    }
	},
	    template: ` 
    	<div class="center">
    		<h1>Sport facilities</h1>
    										<!--SEARCH-->
    		<p style="margin-bottom:1cm; margin-top:1cm">
    			<input type="text" v-model="srchname" placeholder="search by name"/>
    			<input type="text" v-model="srchtype" placeholder="search by type"/>
    		
    			<input type="text" v-model="srchloc" placeholder="search by location"/>    		
    			<input type="text" v-model="srchrat" placeholder="search by rating"/>
    			<input type="button" @click="multiSearch" value="search"/>
    		</p>	
    		<table 
    			<tr>							<!--SORT-->
    				<td></td>
    				<td><input type="button" @click="changeSort('Name')" value="sort"/></td>
    				<td></td>
    				<td><input type="button" @click="changeSort('Location')" value="sort"/></td>
    				<td><input type="button" @click="changeSort('Rating')" value="sort"/></td>
    				<td></td>
    				<td></td>
    			</tr>
    			<tr>
    				<th rowspan="2">Icon</th>
    				<th>Name</th>
    				<th>Type</th>
    				<th>Location</th>
    				<th>Rating</th>
    				<th rowspan="2">Work hours</th>
    				<th>Status</th>
    			</tr>
    			<tr>							<!--FILTER-->
    				<td>
						<input type="text" v-model="searchname" placeholder="filter name"/>
    				</td>
    				<td>
    					<input type="text" v-model="searchtype" placeholder="filter type"/>
    				</td>
    				<td>
    					<input type="text" v-model="searchlocation" placeholder="filter location"/>
    				</td>
    				<td>
    					<input type="text" v-model="searchrating" placeholder="filter rating"/>
    				</td>
    				
    				<td><input type="text" v-model="searchstatus" placeholder="filter status"/></td>
    			</tr>
    			
    											<!--TABLE-->
    			
				<tr v-for="(p, index) in filteredFacilities">
					<td width="100%" height="100%"><img alt="fato" v-bind:src="p.image" width="100px" height="100px"></td>
					<td class="kolona">{{p.name}}</td>
					<td class="kolona">{{p.objectType}}</td>
					<td>
						{{p.location.address.street+" "+p.location.address.number}}<br>
						{{p.location.address.city+"  "+p.location.address.zipCode}}<br>
						{{p.location.longitude+",    "+ p.location.latitude}}
					</td>
					<td>
						{{p.averageRating}}
					</td>
					<td>
						<p style="width:100px;height=100px">From: {{p.startTime}}</p>
						<p style="width:100px;height=100px">Until: {{p.endTime}}</p>
					</td>
					<td v-if="p.status">Open</td>
					<td v-else="p.status">Closed</td>
				</tr>
	    	</table>
   		</div>		  
    	`,
    mounted () {
        axios
          .get('rest/facilities/')
          .then(response => (this.facilities = response.data))
    },
    methods: {
	
		radnoVreme : function(p) {
				return "Radno vreme:"+ vreme(p.startTime) +"-"+vreme(p.endTime);
    	},
    
		radi : function(p) {
    		if (p.status === true){
	    		return "Radi";
    		}
    		else
				return "Ne radi";
    	},
    	vreme: function(p) {
			var d =p.toString();   
			return d.toString();	
		},
		multiSearch() {
					
			axios
				.get('rest/facilities/search/' + this.srchname + '/' + this.srchtype
				+ '/' + this.srchloc + '/' + this.srchrat)
				.then(response => {
					this.facilities = response.data;				
				})
		},
		searchName() {
			this.mode = 'NAME'
			axios
				.get('rest/facilities/search/' + this.srchname + '/' + this.mode)
				.then(response => (this.facilities = response.data))
		},
		searchType(){
			this.mode = 'TYPE'
			axios
				.get('rest/facilities/search/' + this.srchtype + '/' + this.mode)
				.then(response => (this.facilities = response.data))
		},
		searchLocation(){
			this.mode = 'LOCATION'
			axios
				.get('rest/facilities/search/' + this.srchloc + '/' + this.mode)
				.then(response => (this.facilities = response.data))
		},
		searchRating(){
			this.mode = 'RATING'
			axios
				.get('rest/facilities/search/' + this.srchrat + '/' + this.mode)
				.then(response => (this.facilities = response.data))
		},
		changeSort(columnName){
			switch(columnName) {
				case ('Name'):
					{
						/* axios
							.get('rest/facilities/getNameColumn')
							.then(response => {
								this.columnToBeSorted = response.data;
								
								if (this.sortDirectionName === 'ASC') {
									this.columnToBeSorted.sort();
									this.sortDirectionName = 'DESC';
								}else {
									this.sortDirectionName = 'ASC';
									this.columnToBeSorted.sort();
									this.columnToBeSorted.reverse();
								}
								
								this.facilities.forEach((facility, index) => {
									facility.name = this.columnToBeSorted[index];
								})
							})*/
							let copiedFacilities = Object.assign([], this.facilities);
							copiedFacilities.sort((a, b) => {
								let fa = a.name.toLowerCase();
								let fb = b.name.toLowerCase();
								
								if (this.sortDirectionName === 'ASC') {
									if (fa < fb) {
        								return -1;
    								}
								    if (fa > fb) {
								        return 1;
								    }
								    return 0;
								}
								else {
									if (fa < fb) {
    									return 1;
									}
							    	if (fa > fb) {
							        	return -1;
							    	}
							    	return 0;
								}
							})
							if (this.sortDirectionName === 'ASC') {
									this.sortDirectionName = 'DESC';
							}else {
								this.sortDirectionName = 'ASC';
							}
							this.facilities = copiedFacilities;
					}
				break;
				case 'Location':
					{
						/*axios
							.get('rest/facilities/getLocationColumn')
							.then(response => {
								this.columnToBeSorted = response.data;
								  
								this.columnToBeSorted.sort((a, b) => {
									let fa = a.address.city.toLowerCase(),
										fb = b.address.city.toLowerCase();
									if (this.sortDirectionLocation === 'ASC') {
										if (fa < fb) {
        									return -1;
    									}
								    	if (fa > fb) {
								        	return 1;
								    	}
								    	return 0;
									}
									else {
										if (fa < fb) {
        									return 1;
    									}
								    	if (fa > fb) {
								        	return -1;
								    	}
								    	return 0;
									}
								})
								
								if (this.sortDirectionLocation === 'ASC') {
									this.sortDirectionLocation = 'DESC';
								}else {
									this.sortDirectionLocation = 'ASC';
								}
								this.facilities.forEach((facility, index) => {
									facility.location = this.columnToBeSorted[index];
								})
							})*/
							let copiedFacilities = Object.assign([], this.facilities);
							copiedFacilities.sort((a, b) => {
								let fa = a.location.address.city.toLowerCase();
								let fb = b.location.address.city.toLowerCase();
								
								if (this.sortDirectionLocation === 'ASC') {
									if (fa < fb) {
        								return -1;
    								}
								    if (fa > fb) {
								        return 1;
								    }
								    return 0;
								}
								else {
									if (fa < fb) {
    									return 1;
									}
							    	if (fa > fb) {
							        	return -1;
							    	}
							    	return 0;
								}
							})
							if (this.sortDirectionLocation === 'ASC') {
									this.sortDirectionLocation = 'DESC';
							}else {
								this.sortDirectionLocation = 'ASC';
							}
							this.facilities = copiedFacilities;
					}
				break;
				case 'Rating':
					{
						/*axios
							.get('rest/facilities/getRatingColumn')
							.then(response => {
								this.columnToBeSorted = response.data;
								
								if (this.sortDirectionRating === 'ASC') {
									this.sortDirectionRating = 'DESC';
									this.columnToBeSorted.sort();
								}
								else {
									this.sortDirectionRating = 'ASC';
									this.columnToBeSorted.sort();
									this.columnToBeSorted.reverse();
								}
								
								this.facilities.forEach((facility, index) => {
									facility.averageRating = this.columnToBeSorted[index];
								})
							})*/
							let copiedFacilities = Object.assign([], this.facilities);
							copiedFacilities.sort((a, b) => {
								let fa = a.averageRating
								let fb = b.averageRating;
								
								if (this.sortDirectionRating === 'ASC') return fa - fb;
	
								else return fb - fa;
							})
							if (this.sortDirectionRating === 'ASC') {
									this.sortDirectionRating = 'DESC';
							}else {
								this.sortDirectionRating = 'ASC';
							}
							this.facilities = copiedFacilities;
					}
				break;
				
				
			}
		}
	},
	computed:{
		filteredFacilities: function(){
			return this.facilities.filter((p) => {
				if (this.searchname === '' && (this.searchtype === '')
				&& (this.searchrating === '') 
				&& (this.searchlocation === '')
				&& (this.searchstatus === '')) {
					return true
				}
				else if (p.name.match(this.searchname) && (this.searchname !== '')) {
					return true;
				}
				
				else if (p.objectType.match(this.searchtype) && (this.searchtype !== '')){
					return true;
				}
				else if (p.averageRating.toString().match(this.searchrating) && 
				(this.searchrating !== '')) {
					return true;
				}
				else if (p.location.address.city.match(this.searchlocation)
				&& (this.searchlocation !== '')) {
					return true;
				}
				else if (this.searchstatus !== '') {
					if (p.status == true) {
						this.openstatus = 'Open'
					}
					else this.openstatus = 'Closed'
					
					if (this.openstatus.match(this.searchstatus)){
						return true
					}
					
					else return false;
				}
				return false;
			})
		}
	},
	filters: {
		dateFormat: function(value, format) {
			var parsed = moment(value);
    		return parsed.format(format);
		}
	}
});









