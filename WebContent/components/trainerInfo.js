Vue.component("trainerInfo", {
	data: function () {
		return {
			personalTrainings: [],
			groupTrainings: [],
			trainer: {},
			
			upcomingTrainings: [],
			
			isCancel: false,
			
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
	
		template: `
			<div class="container shrink" style="margin-top:-3%">
    			<h1 style="text-align:center">
    			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    			Training schedule</h1>
    			<br></br>
				
				<h3 class="teal darken-2" style="margin-bottom:5%; text-align:center">
					Personal trainings
				</h3>
				<table>
					<tr class="tableRowBorder">
						<th>Icon</th>
						<th>Facility</th>
						<th>Name</th>
						<th>Type</th>
						<th>Duration (hours)</th>
						<th>Description</th>
					</tr>
					<tr v-for="(p, index) in personalTrainings" class="tableRowBorder"
					v-if="p.isDeleted == false">
						<td>
							<img alt="fato" 
							:src="p.image" width="100px" height="100px">
						</td>
						<td>
							{{p.sportFacility.name}}
						</td>
						<td>
							<p clas="tableRow">
								{{p.name}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.trainingType}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.duration}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.description}}
							</p>
						</td>
					</tr>
				</table>
				<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%;
				text-align:center">
					Group trainings
				</h3>
				<table style="margin-bottom:10%">
					<tr class="tableRowBorder">
						<th>Icon</th>
						<th>Facility</th>
						<th>Name</th>
						<th>Type</th>
						<th>Duration (hours)</th>
						<th>Description</th>
					</tr>
					<tr v-for="(p, index) in groupTrainings" 
					v-if="p.isDeleted == false"
					class="tableRowBorder">
						<td>
							<img alt="fato" 
							:src="p.image" width="100px" height="100px">
						</td>
						<td>
							{{p.sportFacility.name}}
						</td>
						<td>
							<p clas="tableRow">
								{{p.name}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.trainingType}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.duration}}
							</p>
						</td>
						<td>
							<p clas="tableRow">
								{{p.description}}
							</p>
						</td>
					</tr>
				</table>
				
				<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%;
				text-align:center">
					Upcoming trainings:
				</h3>
									<!-- UPCOMING TRAININGS -->
									
									<!-- SEARCH -->
									
				<div style="margin-top:7%;">
					<div class="row">
						<div class="col s3">
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
												<!-- FILTER SORT -->
												
						<div class="col s9" style="text-align: center;">
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
									<th>Additional payment (in dinars)</th>
								</tr>
								<tr v-for="(p, index) in filteredTrainingHistories"
								v-if="p.isDeleted == false && p.training.isDeleted == false" 
								class="tableRowBorder"
								:style="{background: p.training.isCanceled == true ? '#4a148c' : '#212121'}">
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
										<a v-if="canCancel(p)" 
										class="btn-floating btn-large waves-effect waves-light teal darken-2"
							    		  @click="cancelTraining(p)"
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
		
		mounted () {
			axios
				.get('rest/currentUser')
				.then(response => {
					this.trainer = response.data;
					return axios.get('rest/trainings/getPersonalTrainingsForSelectedTrainer/' + 
					this.trainer.username)
				})
				.then(response => {
					this.personalTrainings = response.data;
					return axios.get('rest/trainings/getGroupTrainingsForSelectedTrainer/' + 
					this.trainer.username)
				})
				.then(response => {
					this.groupTrainings = response.data;
					return axios.get('rest/newTraining/allForTrainer/' + 
					this.trainer.username)
				})
				.then(response => {
					this.upcomingTrainings = response.data;
					console.log(response.data);
				})
		},
		
		methods: {
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
			
			canCancel (trainingHistory) {
				let returnValue = false;
				
				let trainingDate = new Date(trainingHistory.applicationDateTime);
				let trainingYear = trainingDate.getFullYear();
				let trainingMonth = trainingDate.getMonth() + 1;
				let trainingDay = trainingDate.getDate();
				
				let currentDate = new Date();
				let currentYear = currentDate.getFullYear();
				let currentMonth = currentDate.getMonth() + 1;
				let currentDay = currentDate.getDate();
				
				if (trainingYear >= currentYear &&
					trainingMonth >= currentMonth && (currentDay + 2) <= trainingDay && 
				trainingHistory.training.trainingType === 'personal')
					returnValue = true;

				return returnValue;
			},
			
			cancelTraining(trainingHistory) {
				trainingHistory.training.isCanceled = !trainingHistory.training.isCanceled;
				axios
					.put('rest/newTraining/' + trainingHistory.id, trainingHistory)
					.then(response => {
						console.log(response);
					})
			}
		},
		
		computed: {
			filteredTrainingHistories: function() {
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











