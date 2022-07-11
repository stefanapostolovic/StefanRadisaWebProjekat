Vue.component("listTrainings", {
	data: function() {
		return {
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
			sortDirectionAdd: 'ASC'
		}		
	},
	
	template: 
		`
			<div class="container">
				<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:10%; text-align:center">
					Scheduled trainings
				</h3>
				
				<div style="margin-top:7%;">
					<div class="row">
						<div class="col s3 shrink">
							<div class="card teal darken-2">
					        <div class="card-content white-text">
					          <span class="card-title">Search</span>
					          <p>
								<input type="text" v-model="srchFacName" placeholder="search by facility name"
								class="white-text"/>
					          </p>
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
						
						<div class="col s9" style="text-align:center;">
							
										<!-- FILTER SORT -->
										
							<table style="margin-bottom:10%">
							
								<tr style=" border-bottom: thin solid;">
									<th></th>
									<td>
										<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
			  							@click="changeSort('FacilityName')">
			  							<i class="material-icons">arrow_drop_down</i>
			  							</a>
									</td>
									<td>
										<input type="text" v-model="searchFacilityType" placeholder="filter type"/>
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
								v-if="p.isDeleted == false" class="tableRowBorder">
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
									<td>
										<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
							    		  @click="deleteTraining(p)"
							    		  style="margin-right: 0; margin-left:auto; display:block;">
							    		  <i class="material-icons">cancel</i>
					    		  		</a>
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
	
	mounted() {
		axios
			.get('rest/newTraining/')
			.then(response => {
				this.upcomingTrainings = response.data;
				console.log(response.data);
			})
	},
	
	methods: {
		deleteTraining(trainingHistory) {
			trainingHistory.isDeleted = true;
			
			axios
				.put('rest/newTraining/deleteTrainingHistory/' + trainingHistory.id, 
				trainingHistory)
				.then(response => {
					console.log(response.data);
					router.push('/listTrainings');
				})
		},
		
		changeSort(columnName) {
			switch(columnName) {
					case ('FacilityName'): {
						let copiedUpcomingTrainings = Object.assign([], this.upcomingTrainings);
						copiedUpcomingTrainings.sort((a, b) => {
							let fa = a.training.sportFacility.name.toLowerCase();
							let fb = b.training.sportFacility.name.toLowerCase();
							
							if (this.sortDirectionFacName === 'ASC') {
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
						
						if (this.sortDirectionFacName === 'ASC') {
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
							this.sortDirectionAdd = 'DESC';
							this.sortDirectionFacName = 'DESC';
							this.sortDirectionPrice = 'DESC';
							this.sortDirectionDate = 'DESC';
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
		
		multiSearch() {
			if (this.srchFrom === '') this.srchFrom = '0';
			if (this.srchTo === '') this.srchTo = '0';
			
			axios
				.get('rest/newTraining/search/' + this.srchFacName + '/' +
				this.srchFrom + '/' + this.srchTo + '/' + this.srchDateStart + '/' + this.srchDateEnd)
				.then(response => {
					this.upcomingTrainings = response.data;
				})
		}
	},
	
	computed: {
		filteredTrainingHistories: function()  {
			return this.upcomingTrainings.filter((p) => {
					if (this.searchFacilityType === '' && this.searchTrainingType == '')
						return true;
					else if (p.training.sportFacility.objectType.toLowerCase().match(this.searchFacilityType)
					&& this.searchTrainingType === '') {
						return true;
					}
					else if (this.searchFacilityType === '' && 
					p.training.trainingType.toLowerCase().match(this.searchTrainingType)) {
						return true;
					}
					else if (p.training.sportFacility.objectType.toLowerCase().match(this.searchFacilityType) &&
					p.training.trainingType.toLowerCase().match(this.searchTrainingType))
						return true;
						
					else
						return false; 
				})
		}
	}
		 
});