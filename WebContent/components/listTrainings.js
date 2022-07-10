Vue.component("listTrainings", {
	data: function() {
		return {
			upcomingTrainings: []
		}		
	},
	
	template: 
		`
			<div class="container">
				<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:10%; text-align:center">
					Scheduled trainings
				</h3>
				
										<!-- TABLE -->
												
				<div style="text-align: center;">
					<table style="margin-bottom:10%">										
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
		}
	}
		 
});