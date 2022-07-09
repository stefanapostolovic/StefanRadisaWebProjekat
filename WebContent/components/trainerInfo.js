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
					v-if="p.isDeleted == false"
					:style="{background: p.isCanceled == true ? '#4a148c' : '#212121'}">
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
								<input type="text" v-model="srchFrom" placeholder="search by starting price"
								class="white-text"/>
					          </p>
					          <p>
								<input type="text" v-model="srchTo" placeholder="search by end price"
								class="white-text"/>
					          </p>
					          <p>
								<input type="text" v-model="srchDateStart" placeholder="search by start date"
								class="white-text"/>
					          </p>
					          <p>
								<input type="text" v-model="srchDateEnd" placeholder="search by end date"
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
								</tr>
								<tr v-for="(p, index) in upcomingTrainings"
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
										<a v-if="canCancel(p.training)" 
										class="btn-floating btn-large waves-effect waves-light teal darken-2"
							    		  @click="cancelTraining(p.training)"
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
					return axios.get('rest/getUpcomingTrainingsForSelectedTrainer/' + 
					this.trainer.username)
				})
				.then(response => {
					this.upcomingTrainings = response.data;
					console.log(response.data);
				})
				
				/*.get('rest/currentUser')
				.then(response => {
					this.trainer = response.data;
					return axios.get('rest/trainings/getPersonalTrainingHistoryForSelectedTrainer/'
					+ this.trainer);
				})
				.then(response => {
					this.personalTrainings = response.data;
					return axios.get('rest/trainings/getGroupTrainingHistoryForSelectedTrainer/'
					+ this.trainer)
				})
				.then(response => {
					this.groupTrainings = response.data;
				})*/
		},
		
		methods: {
			changeSort(columnName) {
				
			},
			
			multiSearch () {
				
			},
			
			canCancel (training) {
				if (training.trainingType === 'personal') //DODAO OVDE ZA DATUM PROVERU 
					return true;
				return false;
			},
			
			cancelTraining(training) {
				training.isCanceled = !training.isCanceled;
				//axios.put('rest/trainings/updateTraining', training);
			}
		}
});