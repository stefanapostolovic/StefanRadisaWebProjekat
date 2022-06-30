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
			
			trainer: {},
			trainers: [],	
			
			formData: null
		}
	},
		template:`
			<div>
				<h1>Create a new training</h1>
				<form enctype="multipart/form-data">
					<table>
						<tr>
							<td>Icon</td>
							<td><input type="file" @change="onFileSelected"></td>
						</tr>
						<tr>
							<td>Name</td>
							<td><input type="text" v-model="name"></td>
						</tr>
						<tr>
							<td>Type</td>
							<td><input type="text" v-model="type"></td>
						</tr>
						<tr>
							<td>Description</td>
							<td><input type="text" v-model="description"></td>
						</tr>
						<tr>
							<td>Duration</td>
							<td><input type="text" v-model="duration"></td>
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
			let file = event.target.files[0];
			this.formData = new FormData();
			this.formData.append("file", file);
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
		
		onFileSelected() {
			
		},
		
		confirmCreate() {
			this.newTraining.name = this.name;
			this.newTraining.type = this.type;
			this.newTraining.sportFacility = this.facility;
			this.newTraining.duration = this.duration;
			this.newTraining.trainer = this.trainer;
			this.newTraining.description = this.description;
			
			axios.all([
				this.createTraining(),
				this.uploadFIle()
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