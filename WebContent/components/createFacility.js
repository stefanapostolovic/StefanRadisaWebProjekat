Vue.component("createFacility", {
	data: function() {
		return {
			newFacility: {},
			address: {street:null, number: null, city:null, zipCode:null},
			location: {id:null, longitude:null, latitude:null, address:null},
			
			formData: null,
			
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
	        
	        file: null,
	        
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
	        isFacilityManager: false,
	        
	        isTrainingFile: false,
	        
	        test: ''
		}
	},
		template: `
			<div class="shrink">
				<h1>Create a new facility</h1>
				<br></br>
				<div class="row">
					<div class="col s6 shrink" style="margin-left:5%; margin-right:5%">
						<form enctype="multipart/form-data" >
							<table>
								<tr>
									<td>
										Icon
									</td>
									<td>
										<span v-if="isTrainingFile" class="red-text">
											Please upload a file
										</span>
										<input type="file" name="file" @change="onFileSelected"/>
									</td>
								</tr>
								<tr>
									<td>Ime</td>
									<td>	
										<span v-if="isFacilityName" class="red-text">
											Please enter name
										</span>
										<input type="text" name="objectname" v-model="objectname">
									</td>
								</tr>
								<tr>
									<td>Tip objekta</td>
									<td>
										<span v-if="isFacilityType" class="red-text">
											Please facility type
										</span>
										<input type="text" name="type" v-model="type">
									</td>
								</tr>
								<tr class="tableRowBorder">
									<td colspan="2">Location</td>
								</tr>
								<tr>
									<td>Geografska duzina</td>
									<td>
										<span v-if="isFacilityLong" class="red-text">
											Please enter longitude
										</span>
										<input type="number" name="longitude" v-model="longitude">
									</td>
								</tr>
								<tr>
									<td>Geografska sirina</td>
									<td>
										<span v-if="isFacilityLat" class="red-text">
											Please enter latitude
										</span>
										<input type="number" name="longitude" v-model="latitude">
									</td>
								</tr>
								<tr>
									<td>Ulica</td>
									<td>
										<span v-if="isFacilityStreet" class="red-text">
											Please enter street name
										</span>
										<input type="text" name="latitude" v-model="street">
									</td>
								</tr>
								<tr>
									<td>Broj</td>
									<td>
										<span v-if="isFacilityNum" class="red-text">
											Please enter a number
										</span>
										<input type="text" name="street" v-model="number">
									</td>
								</tr>
								<tr>
									<td>Grad</td>
									<td>
										<span v-if="isFacilityCity" class="red-text">
											Please the city name
										</span>
										<input type="text" name="number" v-model="city">
									</td>
								</tr>
								<tr>
									<td>Postanski broj</td>
									<td>
										<span v-if="isFacilityZip" class="red-text">
											Please the the zip code
										</span>
										<input type="number" name="zipCode" v-model="zipCode">
									</td>
								</tr>
								<tr>
									<td>Menadzer</td>
									<td>
										<span v-if="isFacilityManager" class="red-text">
											Please select a manager
										</span>
										
										<input type="button" v-if="this.validManagers.length == 0" 
										value="Register a new manager" class="btn"
										@click="registerNewManager"/>
										<select name="managers" id="managers" v-else v-model="user"
										style="display: block; background-color:#212121">
											<option v-for="(p, index) in validManagers"
											:value="p">
												{{p.name + ' ' + p.surename}}
											</option>
										</select>
									</td>
								</tr>
							</table>
							<p style="float:left">
								<button class="btn" v-if="this.validManagers.length != 0"
								@click="confirmCreate">Confirm</button>
							</p>
						</form>
						<br></br>
						<br></br>
																<!--CREATE MANAGER-->
					<div v-if="showManagerForm" style="margin-left:35%">
						<form>
							<table style="margin-bottom:5%">
								<tr>
									<td>Korisnicko ime:</td>
									<td>	
										<span v-if="isManagerUsername" class="red-text">
											Please enter the username
										</span>
										<input id="username" v-model = "username"  
										type = "text" name = "username">
									</td>
								</tr>
								<tr>
									<td>Lozinka:</td>
									<td>
										<span v-if="isManagerPass" class="red-text">
											Please enter the password
										</span>
										<input type="password" v-model = "password"  name="password">
								</td>
							
								</tr>
								<tr>
									<td>Ime:</td>
									<td>
										<span v-if="isManagerName" class="red-text">
											Please enter the name
										</span>
										<input id="ime" v-model = "name"  type = "text" name = "name">
								</td>	
								</tr>
								<tr>
									<td>Prezime:</td>
									<td>
										<span v-if="isManagerSurname" class="red-text">
											Please enter the surname
										</span>
										<input type="text" v-model = "surename"  name="surename">
								</td>
								</tr>
								<tr>
									<td>Pol:</td>
									<td>
										<span v-if="isManagerGender" class="red-text">
											Please enter the gender
										</span>
										<select name="pol" id="pol" v-model = "gender" 
										style="display: block; background-color: #212121;">
							 				  <option value="Male">Musko</option>
											  <option value="Female">Zensko</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Datum rodjenja:</td>
									<td>
										<span v-if="isManagerDate" class="red-text">
											Please enter the date
										</span>
										<input type="date" id="rodjenje" name="rodjenje" 
										v-model = "dateOfBirth"/>
								</td>
								</tr>
								<tr>
									<td >
										<button  @click="confirmCreateWithNewManager" 
										class="btn">Poslaji</button>
										<input type="reset" value="Ponisti" class="btn">
										<td></td>
									</td>
								</tr>
							</table>
						</form>
					</div>
					</div>	
									<!-- GOOGLE MAPA -->
									
					<div class="col s3 shrink" style="text-align: center;">
						<!-- Search input -->
						<input id="searchInput"
						class="controls white" type="text" placeholder="Enter a location">
					
						<!-- Google map -->
						<div id="nesto" style="height: 760px; width: 150%; 
						margin-left:10%;"></div>
					
						<br></br>
						<span>
							<button @click="showMap" class="btn">Show Map</button>
							&nbsp;&nbsp;
							<button  @click="fillFormWithMapData" 
							class="btn">Fill form</button>
						</span>
						
						<!-- Display geolocation data -->
						<ul class="geo-data" hidden>
						    <li class="white-text">Full Address: <span id="location"></span></li>
						    <li class="white-text">Postal Code: <span id="postal_code"></span></li>
						    <li class="white-text">Country: <span id="country"></span></li>
						    <li class="white-text">Latitude: <span id="lat"></span></li>
						    <li class="white-text">Longitude: <span id="lon"></span></li>
						</ul>
					</div>				
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
		showMap() {
			location.reload();
		},
		
		fillFormWithMapData() {
			console.log(document.getElementById('location').innerHTML);
			this.longitude = document.getElementById('lon').innerHTML;
			this.latitude = document.getElementById('lat').innerHTML;
			
			let fullAddress = document.getElementById('location').innerHTML;
			/*let fullAddressSplit = fullAddress.split(",");
			
			if (fullAddressSplit[1].trim().split(" ").length > 1) {
				this.city = fullAddressSplit[1].trim().split(" ")[0];
				this.zipCode = fullAddressSplit[1].trim().split(" ")[1];
			}
			else {
				this.city = fullAddressSplit[1];
			}

			let addressWithoutCityCountry = fullAddressSplit[0];
			let addressWithoutCityCountrySplit = addressWithoutCityCountry.split(" ");
			
			let addrNum = addressWithoutCityCountrySplit.pop();
			this.number = addrNum;
			this.street = addressWithoutCityCountrySplit;*/
			//console.log(fullAddressSplit);
			
			this.street = fullAddress;
			this.number = '-';
			this.city = '-';
			this.zipCode = 0;	
		},
		
		onFileSelected(event) {
			this.file = event.target.files[0];
			this.formData = new FormData();
			this.formData.append("file", this.file);
		},
		
		uploadFIle() {
			//return axios.post('rest/facilities/uploadFile', this.formData);
			return axios({
				url:'rest/facilities/uploadFile',
				data:this.formData,
				method:'POST',
				headers:{
					Accept:'application/json',
					'content-type':'multipart/form-data'
				},
				
			})
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
			event.preventDefault();
			
			this.fillOutFacility();
			
			if (this.user.username == null){
				this.isFacilityManager = true;
				this.canCreateFlag = -1;
			}
			else {
				this.isFacilityManager = false;
				this.user.sportFacility = this.newFacility;
			}
			console.log(this.user);
			
			if (this.file == null) {
				this.isTrainingFile = true;
				this.canCreateFlag = -1;	
			}
			else {
				this.isTrainingFile = false;
			}
			
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 	
				
			/*axios.all([
				this.createFacility(),
				this.uploadFIle(),
				this.updateManager()
			])
			.then(axios.spread((first_response) => {
				//this.user = first_response.data;
				router.push(`/`);
			}))
			.catch(axios.spread((first_response) => {
				toast('That name is already taken!');
			}))*/
			
			axios
				.post('rest/facilities/createFacility', this.newFacility)
				.then(response => {
					return axios.get('rest/facilities/getFacilityByName/' + this.newFacility.name);
				})
				.then(response => {
					console.log(response.data)
					return axios({
						url:'rest/facilities/uploadFile',
						data:this.formData,
						method:'POST',
						headers:{
							Accept:'application/json',
							'content-type':'multipart/form-data'
						},
						
					})
				})
				.then(response=> {
					console.log(response.data);
					this.newFacility = response.data;
					this.user.sportFacility = this.newFacility;
					return axios.put('rest/updateUser/' + this.user.username, this.user);
				})
				.then(response => {
					console.log(response.data)
					console.log(this.user);
					router.push('/');
				})
				.catch(response => {
					toast('That name is already taken!');
				})
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
			
			if (this.file == null) {
				this.isTrainingFile = true;
				this.canCreateFlag = -1;	
			}
			else {
				this.isTrainingFile = false;
			}
			
			if (this.canCreateFlag == -1) {
				this.canCreateFlag = 1;
				return;
			}
			else this.canCreateFlag = 1; 
			
			/*axios.all([
				this.createFacility(),
				this.uploadFIle(),
				this.createManager()
			])
			.then(axios.spread((first_response) => {
				router.push(`/`);
			}))
			.catch(axios.spread((first_response) => {
				toast('Username already taken or a facility with the given name already exists!');
			}))*/
			
			axios
				.post('rest/facilities/createFacility', this.newFacility)
				.then(response => {
					return axios({
						url:'rest/facilities/uploadFile',
						data:this.formData,
						method:'POST',
						headers:{
							Accept:'application/json',
							'content-type':'multipart/form-data'
						},
				
					})
				})
				.then(response => {
					this.newFacility = response.data;
					this.user.sportFacility = this.newFacility;
					return axios.post('rest/register/', this.user);
				})
				.then(response => {
					router.push('/');
				})
				.catch(reponse => {
					toast('Facility name is already taken, or a user with that username already exists');
				})
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