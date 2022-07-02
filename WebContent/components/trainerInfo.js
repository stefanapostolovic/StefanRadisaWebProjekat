Vue.component("trainerInfo", {
	data: function () {
		return {
			personalTrainings: [],
			groupTrainings: [],
			trainer: {},
		}
	},
	
		template: `
			<div class="center">
				<h3 class="tableRow">Personal trainings</h3>
				<table>
					<tr>
						<th>Icon</th>
						<th>Facility</th>
						<th>Name</th>
						<th>Type</th>
						<th>Duration</th>
						<th>Description</th>
						<th></th>
					</tr>
					<tr v-for="(p, index) in personalTrainings"
					:style="{background: p.isCanceled == true ? 'red' : 'white'}">
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
							<input type="button" @click="cancelTraining(p)" value="Cancel"/>
						</td>
					</tr>
				</table>
				<h3 class="tableRow" style="margin-top:3cm">Group trainings</h3>
				<table>
					<tr>
						<th>Icon</th>
						<th>Facility</th>
						<th>Name</th>
						<th>Type</th>
						<th>Duration</th>
						<th>Description</th>
					</tr>
					<tr v-for="(p, index) in groupTrainings">
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
		},
		
		methods: {
			cancelTraining(training) {
				training.isCanceled = !training.isCanceled;
				axios.put('rest/trainings/updateTraining', training);
			}
		}
});