Vue.component("createTraining", {
	data: function() {
		return {
			loggedUser: null,
			
			newTraining: {},
			facility: {},
			name: '',
			type: '',
			description: '',
			duration: '',
			
			file: null,
			
			trainer: {},
			trainers: [],	
			
			formData: null,
			
			//validation
			isTrainingName: false,
			isTrainingType: false,
			isTrainingFile: false,
			
			canCreateFlag:  1
		}
	},
		template:`
			<div>
				<h1>Create a new training</h1>
				<form enctype="multipart/form-data">
					<table>
						<tr>
							<td>Icon</td>
							<td>
								<input type="file" name="file" @change="onFileSelected"
								:class="{ invalidField : isTrainingFile}"/>
							</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>
								<input type="text" v-model="name"
								:class="{ invalidField : isTrainingName}">
							</td>
						</tr>
						<tr>
							<td>Type</td>
							<td>
								<input type="text" v-model="type"
								:class="{ invalidField : isTrainingType}">
							</td>
						</tr>
						<tr>
							<td>Description</td>
							<td><input type="text" v-model="description"></td>
						</tr>
						<tr>
							<td>Duration</td>
							<td><input type="number" v-model="duration"></td>
						</tr>
						<tr>
							<td>Trainer</td>
							<td>
								<select name="trainers" id="trainers" v-model="trainer">
									<option v-for="(p, index) in trainers"
									:value="p">
										{{p.name + ' ' + p.surename}}
									</option>
								</select>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<input type="submit" @click.prevent="confirmCreate"
								value="confirm">
							</td>
						</tr>
					</table>
				</form>
			</div>
		`,
		
	mounted() {
		axios.all([
			this.getAllTrainers(),
			this.getLoggedUser()
		])
		.then(axios.spread((first_response, second_response) => {
			this.trainers = first_response.data;
			this.loggedUser = second_response.data;
			this.facility = this.loggedUser.sportFacility;
		}))
	},
	
	methods: {
		onFileSelected(event) {
			this.file = event.target.files[0];
			this.formData = new FormData();
			this.formData.append("file", this.file);
		},
		
		uploadFile() {
			return axios({
				url:'rest/trainings/uploadFile',
				data:this.formData,
				method:'POST',
				headers:{
					Accept:'application/json',
					'content-type':'multipart/form-data'
				},
				
			})
		},
		
		getLoggedUser() {
			return axios.get('rest/currentUser')
		},
		
		getAllTrainers() {
			return axios.get('rest/getTrainers')
		},
		
		confirmCreate() {
			if (this.name === '') {
				this.isTrainingName = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingName = false;
				this.newTraining.name = this.name;
			}
			
			if (this.type === '') {
				this.isTrainingType = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isTrainingType = false;
				this.newTraining.trainingType = this.type;
			}
			
			if (this.file == null) {
				this.isTrainingFile = true;
				this.canCreateFlag = -1;	
			}
			else {
				this.isTrainingFile = false;
			}
			
			this.newTraining.sportFacility = this.facility;
			this.newTraining.duration = this.duration;
			this.newTraining.trainer = this.trainer;
			this.newTraining.description = this.description;
			
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 
			
			axios.all([
				this.createTraining(),
				this.uploadFile()
			])
			.then(axios.spread((first_response) => {
				router.push('/facility');
			}))
			.catch(axios.spread((first_response) => {
				toast('That name is already taken!');
			}))
		},
		
		createTraining() {
			return axios.post('rest/trainings/createTraining', this.newTraining);
		}
	}
});