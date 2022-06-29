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
	        dateOfBirth:'',
	        
	        //validation
	        canCreateFlag: 1,
	        isFacilityName: false,
	        isFacilityType: false,
	        isFacilityLong: false,
	        isFacilityLat: false,
	        isFacilityStreet: false,
	        isFacilityNum: false,
	        isFacilityCity: false,
	        isFacilityZip: false,
	        isManagerUsername: false,
	        isManagerPass: false,
	        isManagerName: false,
	        isManagerSurname: false,
	        isManagerGender: false,
	        isManagerDate: false,
	        isManagerGender: false,
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
								:disabled="showManagerForm" :class="{ invalidField : isFacilityName}">
							</td>
						</tr>
						<tr>
							<td>Tip objekta</td>
							<td><input type="text" name="type" v-model="type"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityType}"></td>
						</tr>
						<tr>
							<td colspan="2">Location</td>
						</tr>
						<tr>
							<td>Geografska duzina</td>
							<td><input type="number" name="longitude" v-model="longitude"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityLong}"></td>
						</tr>
						<tr>
							<td>Geografska sirina</td>
							<td><input type="number" name="longitude" v-model="latitude"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityLat}"></td>
						</tr>
						<tr>
							<td>Ulica</td>
							<td><input type="text" name="latitude" v-model="street"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityStreet}"></td>
						</tr>
						<tr>
							<td>Broj</td>
							<td><input type="text" name="street" v-model="number"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityNum}"></td>
						</tr>
						<tr>
							<td>Grad</td>
							<td><input type="text" name="number" v-model="city"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityCity}"></td>
						</tr>
						<tr>
							<td>Postanski broj</td>
							<td><input type="number" name="zipCode" v-model="zipCode"
								:disabled="showManagerForm"
								:class="{ invalidField : isFacilityZip}"></td>
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
							<td><input id="username" v-model = "username"  type = "text" name = "username"
							:class="{ invalidField : isManagerUsername}">
							</td>
						</tr>
						<tr>
							<td>Lozinka:</td>
							<td><input type="password" v-model = "password"  name="password"
							:class="{ invalidField : isManagerPass}"></td>
					
						</tr>
						<tr>
							<td>Ime:</td>
							<td><input id="ime" v-model = "name"  type = "text" name = "name"
							:class="{ invalidField : isManagerName}"></td>	
						</tr>
						<tr>
							<td>Prezime:</td>
							<td><input type="text" v-model = "surename"  name="surename"
							:class="{ invalidField : isManagerSurname}"></td>
						</tr>
						<tr>
							<td>Pol:</td>
							<td>
								<select name="pol" id="pol" v-model = "gender" 
								:class="{ invalidField : isManagerGender}">
					 				  <option value="Male">Musko</option>
									  <option value="Female">Zensko</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Datum rodjenja:</td>
							<td><input type="date" id="rodjenje" name="rodjenje" v-model = "dateOfBirth"
							:class="{ invalidField : isManagerDate}"/></td>
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
			if (this.street === '') {
				this.isFacilityStreet = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityStreet = false;
				this.address.street = this.street;
			}
			
			if (this.number === '') {
				this.isFacilityNum = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityNum = false;
				this.address.number = this.number;
			}
			
			if (this.city === '') {
				this.isFacilityCity = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityCity = false;
				this.address.city = this.city;
			}
			
			if (this.zipCode === '') {
				this.isFacilityZip = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityZip = false;
				this.address.zipCode = parseInt(this.zipCode);
			}	
			
			if (this.longitude === '') {
				this.isFacilityLong = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityLong = false;
				this.location.longitude = parseFloat(this.longitude);
			}
			
			if (this.latitude === '') {
				this.isFacilityLat = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityLat = false;
				this.location.latitude = parseFloat(this.latitude);
			}
			
			this.location.address = this.address;			
			
			if (this.objectname === '') {
				this.isFacilityName = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityName = false;
				this.newFacility.name = this.objectname;
			}
			
			if (this.type === '') {
				this.isFacilityType = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityType = false;
				this.newFacility.objectType = this.type;
			}
			
			this.newFacility.status = false;
			this.newFacility.location = this.location;
		},
		
		confirmCreate() {
			this.fillOutFacility();
			this.user.sportFacility = this.newFacility;
		
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 	
			
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
			
			if (this.username === '') {
				this.isManagerUsername = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isManagerUsername = false;
				this.user.username = this.username;
			}
			
			if (this.password === '') {
				this.isManagerPass = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isManagerPass = false;
				this.user.password = this.password;
			}
			
			if (this.name === '') {
				this.isManagerName = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isManagerName = false;
				this.user.name = this.name;
			}
			
			if (this.surename === '') {
				this.isManagerSurname = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isManagerSurname = false;
				this.user.surename = this.surename;
			} 
			
			if (this.gender === '') {
				this.isManagerGender = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isManagerGender = false;
				this.user.gender = this.gender;
			}
			
			if (this.dateOfBirth === '') {
				this.isManagerDate = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isManagerDate = false;
				this.user.dateOfBirth = this.dateOfBirth;
			}
			
			this.user.sportFacility = this.newFacility;
			
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 
			
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