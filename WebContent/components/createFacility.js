Vue.component("createFacility", {
	data: function() {
		return {
			newFacility: {},
			address: {street:null, number: null, city:null, zipCode:null},
			location: {id:null, longitude:null, latitude:null, address:null},
			
			selectedFile: null,
			
			objectname: '',
			type: '',
			longitude: '',
			latitude: '',
			street: '',
			number: '',
			city: '',
			zipCode: '',
			
			validManagers: [],
			showManagerForm: false,
			
			//manager
			user: {username:null, password:null, name:"pedro", surename:null, gender:null, dateOfBirth:null,role:"Manager" },
	        username:'',
	        password:'',
	        name:'',
	        surename:'',
	        gender:'',
	        dateOfBirth:''
		}
	},
		template: `
			<div>
				<h1>Create a new facility</h1>
				<form>
					<table>
						<tr>
							<td>
								Icon
							</td>
							<td>
								<input type="file" @change="onFileSelected"/>
							</td>
						</tr>
						<tr>
							<td>Ime</td>
							<td><input type="text" name="objectname" v-model="objectname"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Tip objekta</td>
							<td><input type="text" name="type" v-model="type"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td colspan="2">Location</td>
						</tr>
						<tr>
							<td>Geografska duzina</td>
							<td><input type="text" name="longitude" v-model="longitude"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Geografska sirina</td>
							<td><input type="text" name="longitude" v-model="latitude"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Ulica</td>
							<td><input type="text" name="latitude" v-model="street"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Broj</td>
							<td><input type="text" name="street" v-model="number"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Grad</td>
							<td><input type="text" name="number" v-model="city"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Postanski broj</td>
							<td><input type="text" name="zipCode" v-model="zipCode"
								:disabled="showManagerForm"></td>
						</tr>
						<tr>
							<td>Menadzer</td>
							<td>
								<input type="button" v-if="this.validManagers.length == 0" 
								value="Register a new manager"
								@click="registerNewManager"/>
								<select name="managers" id="managers" v-else v-model="user">
									<option v-for="(p, index) in validManagers"
									:value="p">
										{{p.name + ' ' + p.surename}}
									</option>
								</select>
							</td>
						</tr>
					</table>
					<p style="float:left">
						<input type="button" value="Poslaji" v-if="this.validManagers.length != 0"
						@click="confirmCreate"/>
					</p>
				</form>
				
									<!--CREATE MANAGER-->
				<div v-if="showManagerForm" style="margin-top:3cm">
					<form>
					<table>
						<tr>
							<td>Korisnicko ime:</td>
							<td><input id="username" v-model = "username"  type = "text" name = "username">
							</td>
						</tr>
						<tr>
							<td>Lozinka:</td>
							<td><input type="password" v-model = "password"  name="password"></td>
					
						</tr>
						<tr>
							<td>Ime:</td>
							<td><input id="ime" v-model = "name"  type = "text" name = "name"></td>	
						</tr>
						<tr>
							<td>Prezime:</td>
							<td><input type="text" v-model = "surename"  name="surename"></td>
						</tr>
						<tr>
							<td>Pol:</td>
							<td>
								<select name="pol" id="pol" v-model = "gender" >
					 				  <option value="Male">Musko</option>
									  <option value="Female">Zensko</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Datum rodjenja:</td>
							<td><input type="date" id="rodjenje" name="rodjenje" v-model = "dateOfBirth"/></td>
						</tr>
						<tr>
							<td >
								<input type="submit"  v-on:click = "confirmCreateWithNewManager" value="Poslaji">
								<input type="reset" value="Ponisti">
							</td>
						</tr>
					</table>
				</form>
				</div>
			</div>
		`,
	
	mounted() {
		axios.all([
			this.getAllValidManagers()
		])
		.then(axios.spread((first_response) => {
			this.validManagers = first_response.data;
		}))
	},
	
	methods: {
		onFileSelected(event) {
			this.selectedFile = event.target.files[0];
			console.log(this.selectedFile);
		},
		
		getAllValidManagers() {
			return axios.get('rest/getValidManagers')
		},
		
		registerNewManager() {
			this.showManagerForm = !this.showManagerForm;
		},
		
		fillOutFacility() {
			this.address.street = this.street;
			this.address.number = this.number;
			this.address.city = this.city;
			this.address.zipCode = parseInt(this.zipCode);	

			this.location.longitude = parseFloat(this.longitude);
			this.location.latitude = parseFloat(this.latitude);
			this.location.address = this.address;			
			
			this.newFacility.name = this.objectname;
			this.newFacility.objectType = this.type;
			this.newFacility.status = false;
			this.newFacility.location = this.location;
		},
		
		confirmCreate() {
			this.fillOutFacility();
			this.user.sportFacility = this.newFacility;
			
			axios.all([
				this.createFacility(),
				this.updateManager()
			])
			.then(axios.spread((first_response) => {
				this.user = first_response.data;
				router.push(`/`);
			}))
		},
		
		confirmCreateWithNewManager() {
			event.preventDefault();
			
			this.fillOutFacility();
			
			this.user.username = this.username;
			this.user.password = this.password;
			this.user.name = this.name;
			this.user.surename = this.surename;
			this.user.gender = this.gender;
			this.user.dateOfBirth = this.dateOfBirth;
			this.user.sportFacility = this.newFacility;
			
			axios.all([
				this.createFacility(),
				this.createManager()
			])
			.then(axios.spread((first_response) => {
				router.push(`/`);
			}))
			.catch(axios.spread((first_response) => {
				toast('Username already taken!');
			}))
		},
		
		createFacility() {
			return axios.post('rest/facilities/createFacility', this.newFacility);
		},
		
	 	createManager() {
			return axios.post('rest/register/', this.user);
		},
		
		updateManager() {
			return axios.put('rest/updateUser/' + this.user.username, this.user);
		}
	}
});