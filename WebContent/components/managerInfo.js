Vue.component("managerInfo", {
	data: function () {
		return {
			id: '',
			
			facility: {"id":null, "name":null, "objectType":null, "status":null,
	        "location":{"longitude":null,"latitude":null,"address":{}}, 
	        "image":null, "averageRating":null, "startTime":null, "endTime":null},
	        
	        trainings: [],
	        trainers: [],
		
		    loggedUser: null, 
		    
		    //zakazani treninzi
		    upcomingTrainings: [],
		    
		    //search
			srchFacName: '',
			srchFrom: '',
			srchTo: '',
			srchDateStart: '',
			srchDateEnd: '',
			
			//filtriranje
			searchFacilityType: '',
			searchTrainingType: '',
			
			//sortiranje
			sortDirectionFacName: 'ASC',
			sortDirectionPrice: 'ASC',
			sortDirectionDate: 'ASC',
			sortDirectionAdd: 'ASC',
			
			//kupci
			customers: []
		}
	},
	
		template: `
			<div class="center">
				<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:5%">{{facility.name}}</h3>
				
				<table>
					<tr class="tableRowBorder">
						<th>Logo</th>
						<th>Name</th>
						<th>Type</th>
						<th>Location</th>
						<th>Rating</th>
						<th>Status</th>
					</tr>
					<tr class="tableRowBorder" v-if="facility.isDeleted == false">
						<td>
							<img alt="fato" v-bind:src="facility.image" width="100px" height="100px">
						</td>
						<td class="kolona">
							<p style="width:150px;height=150px">
								{{facility.name}}
							</p>
						</td>
						<td>
							<p style="width:150px;height=150px">{{facility.objectType}}</p>	
						</td>
						<td>
							<p style="width:150px;height=150px">
								{{facility.location.address.street+" "+facility.location.address.number}}
							</p>
							<p style="width:150px;height=150px">
								{{facility.location.address.city+"  "+facility.location.address.zipCode}}
							</p>
							<p style="width:150px;height=150px">
								{{facility.location.longitude+",    "+ facility.location.latitude}}
							</p>
						</td>
						<td>
							<p style="width:150px;height=150px">{{facility.averageRating}}</p>
						</td>
						<td v-if="facility.status">Open</td>
						<td v-else="facility.status">Closed</td>
					</tr>
		    	</table>    
	
			<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Training types:</h3>
			<table>
				<tr class="tableRowBorder">
					<th>
						Icon
					</th>
					<th>
						Name
					</th>
					<th>
						Type
					</th>
					<th>
						Description
					</th>
					<th>
						Time
					</th>
					<th>
						Duration (hours)
					</th>
					<th>
						Trainer
					</th>
					<th>
						Additional payment
					</th>
				</tr>
				<tr v-for="(p, index) in trainings" 
				v-if="p.isDeleted == false"
				@click="changeTraining(p)" class="tableRowBorder">
					<td><img alt="fato" 
					:src="p.image" width="100px" height="100px"></td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.name}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.trainingType}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.description}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.trainingTime}}
						</p>
					</td>
					<td class="kolona">
						<p style="width:150px;height=150px">
							{{p.duration}}
						</p>
					</td>
					<td v-if="p.trainer !== null" class="kolona">
						<p style="width:150px;height=150px">
							{{p.trainer.name + ' ' + p.trainer.surename}}
						</p>
					</td>
					<td v-else>
						<p style="width:150px;height=150px">
							-
						</p>
					</td>
					<td>
						{{p.additionalPayment}}
					</td>
				</tr>
		    </table>
		    <p style="margin-top:2cm; margin-bottom:3cm;">
			    
			    	<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
					v-if="loggedUser.sportFacility != null"
		    		  @click="createTraining"
		    		  style="margin-right: 0; margin-left:auto; display:block;">
		    		  	<i class="material-icons">add</i>
		    		</a>
			    </p>
		    <h3 class="teal darken-2" style="margin-top:10%; margin-bottom:5%">Trainer list</h3>
		    <table>
		    	<tr class="tableRowBorder">	
		    		<th>Name</th>
		    		<th>Surname</th>
		    		<th>Gender</th>
		    		<th>Date of birth</th>
		    	</tr>
		    	<tr v-for="(p, index) in trainers"
		    	v-if="p.isDeleted == false" 
		    	class="tableRowBorder">
		    		<td>
		    			<p class="tableRow">{{p.name}}</p>
		    		</td>
		    		<td>
		    			<p class="tableRow">{{p.surename}}</p>
		    		</td>
		    		<td>
		    			<p class="tableRow">{{p.gender}}</p>
		    		</td>
		    		<td>
		    			<p class="tableRow">{{p.dateOfBirth}}</p>
		    		</td>
		    	</tr>
		    </table>
		    						<!-- CUSTOMERS -->
		    	<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Customers</h3>	
		    	
		    	<table>
		    		<tr class="tableRowBorder">
		    			<th>Name</th>
		    			<th>Surname</th>
		    			<th>Gender</th>
		    			<th>Date of birth</th>
		    			<th>Membership</th>
		    			<th>Points</th>
		    			<th>Customer type</th>
		    		</tr>
		    		
		    		<tr class="tableRowBorder" 
		    		v-for="(p, index) in customers"
		    		v-if="p.isDeleted == false">
		    			<td>
		    				{{p.name}}
		    			</td>
		    			
		    			<td>
		    				{{p.surename}}
		    			</td>
		    				
		    			<td>
		    				{{p.gender}}
		    			</td>
		    				
		    			<td>
		    				{{p.dateOfBirth}}
		    			</td>
		    				
		    			<td>
		    				{{p.membership.membershipType}}
		    			</td>
		    				
		    			<td>
		    				{{p.points}}
		    			</td>
		    				
		    			<td>
		    				{{p.customerType.name}}
		    			</td>
		    		</tr>
		    	</table>
		    
		    						<!-- UPCOMING TRAININGS -->
		    
		    							<!-- SEARCH -->
		    							
				<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">Scheduled trainings</h3>	
									
				<div style="margin-top:7%;">
					<div class="row">
						<div class="col s3">
							<div class="card teal darken-2">
					        <div class="card-content white-text">
					          <span class="card-title">Search</span>
					          <p>
								<input type="number" v-model="srchFrom" placeholder="search by starting price"
								value="0" class="white-text"/>
					          </p>
					          <p>
								<input type="number" v-model="srchTo" placeholder="search by end price"
								value="0" class="white-text"/>
					          </p>
					          <p>
								<input type="date" v-model="srchDateStart" placeholder="search by start date"
								class="white-text"/>
					          </p>
					          <p>
								<input type="date" v-model="srchDateEnd" placeholder="search by end date"
								class="white-text"/>
					          </p>
					        </div>
					        <div class="card-action">
					          <a @click="multiSearch">search</a>
					        </div>
					      </div>
						</div>
												<!-- FILTER SORT -->
												
						<div class="col s9" style="text-align: center;">
							<table style="margin-bottom:10%">
								<tr style=" border-bottom: thin solid;">
									<th></th>
									<td>
									</td>
									<td>
									</td>
									<td></td>
									<td>
										<input type="text" v-model="searchTrainingType" placeholder="filter type"/>
									</td>
									<td>
										<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
				  						@click="changeSort('Date')">
				  							<i class="material-icons">arrow_drop_down</i>
				  						</a>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
				  						@click="changeSort('Add')">
				  							<i class="material-icons">arrow_drop_down</i>
				  						</a>
									</td>
								</tr>				
												<!-- TABLE -->
						
								<tr class="tableRowBorder">
									<th>Icon</th>
									<th>Facility name</th>
									<th>Facility type</th>
									<th>Name</th>
									<th>Type</th>
									<th>Date</th>
									<th>Time</th>
									<th>Duration (hours)</th>
									<th>Description</th>
									<th>Additional payment</th>
								</tr>
								<tr v-for="(p, index) in filteredTrainingHistories"
								:style="{background: p.training.isCanceled == true ? '#4a148c' : '#212121'}"
								v-if="p.isDeleted == false && p.training.isDeleted == false" 
								class="tableRowBorder">
									<td>
										<img alt="fato" 
										:src="p.training.image" width="100px" height="100px">
									</td>
									<td>
										{{p.training.sportFacility.name}}
									</td>
									<td>
										{{p.training.sportFacility.objectType}}
									</td>
									<td>
										<p clas="tableRow">
											{{p.training.name}}
										</p>
									</td>
									<td>
										<p clas="tableRow">
											{{p.training.trainingType}}
										</p>
									</td>
									<td>{{p.applicationDateTime}}</td>
									<td>{{p.training.trainingTime}}</td>
									<td>
										<p clas="tableRow">
											{{p.training.duration}}
										</p>
									</td>
									<td>
										<p clas="tableRow">
											{{p.training.description}}
										</p>
									</td>
									<td>
										<p clas="tableRow">
											{{p.training.additionalPayment}}
										</p>
									</td>
									<td class="red-text">
										<span v-if="p.training.isCanceled">
										Canceled</span>
									</td>
								</tr>
							</table>
						</div>
					</div>
    			</div>			
			</div>
		`,
		
		mounted () {	
			axios
				.get('rest/currentUser')
				.then(response => {
					this.loggedUser = response.data;
					this.id = this.loggedUser.sportFacility.id
					return axios.get('rest/facilities/getFacility/' + this.id)
				})
				.then(response => {
					this.facility = response.data;
					return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
				})
				.then(response => {
					this.trainings = response.data;
					this.trainings.forEach(this.getTrainingTrainer);
					return axios.get('rest/newTraining/getTrainingHistoryForSelectedFacility/'
					+ this.facility.id);
				})
				.then(response => {
					this.upcomingTrainings = response.data;
					console.log(this.upcomingTrainings);
					return axios.get('rest/newTraining/getCustomerForSelectedFacility/'
					+ this.facility.id);
				})
				.then(response => {
					this.customers = response.data;
					console.log(response.data);
				})
		},
		
		methods: {
			changeSort(columnName) {
				
				
				switch(columnName) {
					case ('Date'): {
						let copiedUpcomingTrainings = Object.assign([], this.upcomingTrainings);
						
						copiedUpcomingTrainings.sort((a, b) => {
							let fa = a.applicationDateTime;
							let fb = b.applicationDateTime;
							
							if (this.sortDirectionDate === 'ASC') {
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
						
						if (this.sortDirectionDate === 'ASC') {
							this.sortDirectionFacName = 'DESC';
							this.sortDirectionPrice = 'DESC';
							this.sortDirectionDate = 'DESC';
							this.sortDirectionAdd = 'DESC';
						}
						else {
							this.sortDirectionFacName = 'ASC';
							this.sortDirectionPrice = 'ASC';
							this.sortDirectionDate = 'ASC';
							this.sortDirectionAdd = 'ASC';
						}
						
						this.upcomingTrainings = copiedUpcomingTrainings;
					}
					break;
					
					case ('Add'): {
						let copiedUpcomingTrainings = Object.assign([], this.upcomingTrainings);
						
						copiedUpcomingTrainings.sort((a, b) => {
							let fa = a.training.additionalPayment;
							let fb = b.training.additionalPayment;
							
							if (this.sortDirectionAdd === 'ASC') {
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
						
						if (this.sortDirectionAdd === 'ASC') {
							this.sortDirectionFacName = 'DESC';
							this.sortDirectionPrice = 'DESC';
							this.sortDirectionDate = 'DESC';
							this.sortDirectionAdd = 'DESC';
						}
						else {
							this.sortDirectionFacName = 'ASC';
							this.sortDirectionPrice = 'ASC';
							this.sortDirectionDate = 'ASC';
							this.sortDirectionAdd = 'ASC';
						}
						
						this.upcomingTrainings = copiedUpcomingTrainings;
					}
					break;
				}
			},
			
			multiSearch () {
				if (this.srchFrom === '') this.srchFrom = '0';
				if (this.srchTo === '') this.srchTo = '0';
				
				axios
					.get('rest/newTraining/search/' + this.srchFacName + '/' +
					this.srchFrom + '/' + this.srchTo + '/' + this.srchDateStart + '/' + this.srchDateEnd)
					.then(response => {
						this.upcomingTrainings = response.data;
					})
			},
			
			getTrainingTrainer(item, index) {
				//DODAO//
				if (item.isDeleted == true || item.trainer == null) return;
				
				var obj = this.trainers.filter(function(elem) {
					if(elem.name === item.trainer.name) {
						return item.trainer.name;
					}
				});
				if (obj.length == 0) this.trainers.push(item.trainer);
			},
			
			changeTraining(selectedTraining) {
				localStorage.setItem("selectedTraining", selectedTraining.id);
				router.push('/viewTraining');
			},
			
			getLoggedUser() {
				return axios.get('rest/currentUser');
			},
			
			getAllTrainingsForCurrentFacility() {
				return axios.get('rest/trainings/getTrainingsForSelectedFacility/' + this.id);
			},
			
			createTraining() {
				localStorage.setItem("selectedFacility", this.id)
				router.push('/createTraining');	
			},
		},
		
		computed: {
			filteredTrainingHistories: function() {
				return this.upcomingTrainings.filter((p) => {
					if (this.searchTrainingType === '')
						return true;
					else if (this.searchTrainingType !== '' && 
					p.training.trainingType.toLowerCase().match(this.searchTrainingType)) {
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









