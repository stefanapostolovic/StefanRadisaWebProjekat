Vue.component("facilities", { 
	data: function () {
	    return {
	      facilities: [],
	      facilitiesCopy: [],
		  fac:null,
	      searchtype: '',
	      showOnlyOpened: false,
	      
	      srchname: '',
	      srchtype: '',
	      srchloc: '',
	      srchrat: '',

		  sortDirectionName: 'ASC',
		  sortDirectionLocation: 'ASC',
		  sortDirectionRating: 'ASC',
		  
		  loggedUser: {}
	    }
	},
	    template: ` 
    	<div>
    		<br></br>
    		<h1>Sport facilities</h1>
    		<br></br>
    										<!--SEARCH-->		
    		
    		<div class="row" width=100%>
    			<div class="col s3" style="margin-top:5%; margin-left:7%">
    				<div class="row">
					    <div class="col s12 m6">
					      <div class="card teal darken-2">
					        <div class="card-content white-text">
					          <span class="card-title">Search</span>
					          <p>
								<input type="text" v-model="srchname" placeholder="search by name"/>
					          </p>
					          <p>
								<input type="text" v-model="srchtype" placeholder="search by type"/>
					          </p>
					          <p>
								<input type="text" v-model="srchloc" placeholder="search by location"/>
					          </p>
					          <p>
								<input type="text" v-model="srchrat" placeholder="search by rating"/>
					          </p>
					        </div>
					        <div class="card-action">
					          <a @click="multiSearch">search</a>
					        </div>
					      </div>
					    </div>
			  		</div>
    			</div>
    			<div class="col s6" style="text-align: center;">
    				<table>
	    			<tr
	    			style=" border-bottom: thin solid;">		<!--SORT && FILTER-->
	    				<th></th>
	    				<td>
	  						<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Name')">
	  							<i class="material-icons">arrow_drop_down</i>
	  						</a>
	        			</td>
	    				
	    				<td>
	    					<input type="text" v-model="searchtype" placeholder="filter type"/>
	    				</td>
	    				
	    				<td>
	  						<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Location')">
	  							<i class="material-icons">arrow_drop_down</i>
	  						</a>
	        			</td>
	    				
	    				<td>
	  						<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
	  						@click="changeSort('Rating')">
	  							<i class="material-icons">arrow_drop_down</i>
	  						</a>
	        			</td>
	    				
	    				<th></th>
	    				
	    				<a class="waves-effect waves-light btn-small teal darken-2" @click="filterOpenFacilities">
	    					<i class="material-icons left">business</i>show opened
	    				</a>
	    			</tr>
	    			<tr style="border-top: thin solid; 
    					border-bottom: thin solid;">
	    				<th>Icon</th>
	    				<th>Name</th>
	    				<th>Type</th>
	    				<th>Location</th>
	    				<th>Rating</th>
	    				<th>Work hours</th>
	    				<th>Status</th>
	    			</tr>
	    											<!--TABLE-->
	    			
					<tr v-for="(p, index) in filteredFacilities" v-on:click="sentToChild(p)"
						style="border-top: thin solid; 
    					border-bottom: thin solid;">
						<td><img alt="fato" v-bind:src="p.image" width="100px" height="100px"></td>
						<td>
							<p style="width:150px;height=150px">
								{{p.name}}
							</p>
						</td>
						<td>
							<p style="width:150px;height=150px">
								{{p.objectType}}
							</p>
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
						<td v-if="p.status">
							<p style="width:150px;height=150px">Open</p>
						</td>
						<td v-else="p.status">
							<p style="width:150px;height=150px">Closed</p>
						</td>
					</tr>
		    	</table>
		    	<p style="margin-bottom:1cm; margin-top:1cm">
		    		  <a class="btn-floating btn-large waves-effect waves-light teal darken-2"
		    		  @click="createFacility" v-if="isAdmin()"
		    		  style="margin-right: 0; margin-left:auto; display:block;">
		    		  	<i class="material-icons">add</i>
		    		  </a>
		    	</p>
	    			</div>
    		</div>
   		</div>		  
    	`,
    mounted () {
		axios.all([
			this.getAllFacilities(),
			this.getLoggedUser()
		])
		.then(axios.spread((first_response, second_response) => {
			this.facilities = first_response.data;
			this.facilitiesCopy = first_response.data;
			
			this.loggedUser = second_response.data;
		}))
    },
    methods: {
		isAdmin() {
			return this.loggedUser.role === 'Administrator'
		},
		
		getAllFacilities() {
			return axios.get('rest/facilities/')
		},
		
		getLoggedUser() {
			return axios.get('rest/currentUser')
		},
		
		createFacility() {
			router.push(`/createFacility`);
		},
		
		sentToChild:function(p){
			localStorage.setItem("selectedFacility", p.id)
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









