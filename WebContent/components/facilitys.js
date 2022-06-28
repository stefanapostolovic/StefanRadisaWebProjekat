Vue.component("facilities", { 
	data: function () {
	    return {
	      facilities: [],
	      facilitiesCopy: [],
		  fac:null,
	      searchtype: '',
	      //searchname: '',
	      //searchlocation: '',
	      //searchrating: '',
	      //openstatus: '',
	      //searchstatus: '',
	      showOnlyOpened: false,
	      
	      srchname: '',
	      srchtype: '',
	      srchloc: '',
	      srchrat: '',
		  //mode: '', 
		  
		  //columnToBeSorted: [],
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
    		<table >
    			<tr>							<!--SORT && FILTER-->
    				<th rowspan="2">Icon</th>
    				<td><input type="button" @click="changeSort('Name')" value="sort"/></td>
    				<td><input type="text" v-model="searchtype" placeholder="filter type"/></td>
    				<td><input type="button" @click="changeSort('Location')" value="sort"/></td>
    				<td><input type="button" @click="changeSort('Rating')" value="sort"/></td>
    				<th rowspan="2">Work hours</th>
    				<td><input type="button" @click="filterOpenFacilities" value="Show opened"/></td>
    			</tr>
    			<tr>
    				<th>Name</th>
    				<th>Type</th>
    				<th>Location</th>
    				<th>Rating</th>
    				<th>Status</th>
    			</tr>
    											<!--TABLE-->
    			
				<tr v-for="(p, index) in filteredFacilities" v-on:click="sentToChild(p)">
					<td width="100%" height="100%"><img alt="fato" v-bind:src="p.image" width="100px" height="100px"></td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.name}}
						</p>
					</td>
					<td class="kolona">
						{{p.objectType}}
					</td>
					<td>
						<p style="width:150px;height=150px">
							{{p.location.address.street+" "+p.location.address.number}}
						</p>
						<p style="width:150px;height=150px">
							{{p.location.address.city+"  "+p.location.address.zipCode}}
						</p>
						<p style="width:150px;height=150px">
							{{p.location.longitude+",    "+ p.location.latitude}}
						</p>
					</td>
					<td>
						<p style="width:150px;height=150px">{{p.averageRating}}</p>
					</td>
					<td>
						<p style="width:150px;height=150px">From: {{p.startTime}}</p>
						<p style="width:150px;height=100px">Until: {{p.endTime}}</p>
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
          .then(response => {
				this.facilities = response.data;
				this.facilitiesCopy = response.data;
			})
    },
    methods: {
		sentToChild:function(p){
		//	this.$root.$emit('messageFromParent', "Valjda ovo radi");
			pom=p
			router.push(`/facility`);
		},
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
		
		changeSort(columnName){
			switch(columnName) {
				case ('Name'):
					{
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
								this.sortDirectionLocation = 'DESC';
								this.sortDirectionRating = 'DESC';
							}else {
								this.sortDirectionName = 'ASC';
								this.sortDirectionLocation = 'ASC';
								this.sortDirectionRating = 'ASC';
							}
							this.facilities = copiedFacilities;
					}
				break;
				case 'Location':
					{
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
								this.sortDirectionName = 'DESC';
								this.sortDirectionLocation = 'DESC';
								this.sortDirectionRating = 'DESC';
							}else {
								this.sortDirectionName = 'ASC';
								this.sortDirectionLocation = 'ASC';
								this.sortDirectionRating = 'ASC';
							}
							this.facilities = copiedFacilities;
					}
				break;
				case 'Rating':
					{
							let copiedFacilities = Object.assign([], this.facilities);
							copiedFacilities.sort((a, b) => {
								let fa = a.averageRating
								let fb = b.averageRating;
								
								if (this.sortDirectionRating === 'ASC') return fa - fb;
	
								else return fb - fa;
							})
							if (this.sortDirectionRating === 'ASC') {
								this.sortDirectionName = 'DESC';
								this.sortDirectionLocation = 'DESC';
								this.sortDirectionRating = 'DESC';
							}else {
								this.sortDirectionName = 'ASC';
								this.sortDirectionLocation = 'ASC';
								this.sortDirectionRating = 'ASC';
							}
							this.facilities = copiedFacilities;
					}
				break;
			}
		},
		
		filterOpenFacilities () {
			
			if (this.showOnlyOppened == true) {
				this.facilities = this.facilitiesCopy;
				this.showOnlyOppened = !this.showOnlyOppened;
			}
			else {
				var openFacilites = []
			
				this.facilities.forEach((facility, index) => {
					if (facility.status == true) {
						openFacilites[index] = facility
					}
				})
				
				this.showOnlyOppened = !this.showOnlyOppened;
				this.facilities = openFacilites;
			}
		},
		
		showDetails() {
			router.push(`/facility`);
		}
	},
	computed:{
		filteredFacilities: function(){
			return this.facilities.filter((p) => {
				if (this.searchtype === '') {
					return true
				}
				else if (p.objectType.match(this.searchtype) && (this.searchtype !== '')) {
					return true;
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









