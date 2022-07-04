Vue.component("trainerInfo", {
	data: function () {
		return {
			personalTrainings: [],
			groupTrainings: [],
			trainer: {},
		}
	},
	
		template: `
			<div class="container shrink" style="margin-top:-3%">
    			<h1>Training schedule</h1>
    			<br></br>
				
				<h3 class="teal darken-2" style="margin-bottom:5%">
					Personal trainings
				</h3>
				<table>
					<tr class="tableRowBorder">
						<th>Icon</th>
						<th>Facility</th>
						<th>Name</th>
						<th>Type</th>
						<th>Duration</th>
						<th>Description</th>
						<th></th>
					</tr>
					<tr v-for="(p, index) in personalTrainings" class="tableRowBorder"
					:style="{background: p.isCanceled == true ? 'red' : 'grey darken-4'}">
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
						<td>
							<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
				    		  @click="cancelTraining(p)"
				    		  style="margin-right: 0; margin-left:auto; display:block;">
				    		  <i class="material-icons">cancel</i>
		    		  		</a>
						</td>
					</tr>
				</table>
				<h3 class="teal darken-2" style="margin-top:15%; margin-bottom:5%">
					Group trainings
				</h3>
				<table style="margin-bottom:10%">
					<tr class="tableRowBorder">
						<th>Icon</th>
						<th>Facility</th>
						<th>Name</th>
						<th>Type</th>
						<th>Duration</th>
						<th>Description</th>
					</tr>
					<tr v-for="(p, index) in groupTrainings" class="tableRowBorder">
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
			cancelTraining(training) {
				training.isCanceled = !training.isCanceled;
				axios.put('rest/trainings/updateTraining', training);
			}
		}
});