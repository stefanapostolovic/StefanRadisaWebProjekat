Vue.component("login", { 
	data: function () {
	    return {
	     user: {},
	     username : "",
	     password : "",
		 image:"",
		 
		 isUsername: false,
		 isPassword: false,
		 returnFlag: -1,
		 
	    }
	},
	    template: ` 
    	<div class="row" style="margin-top:10%">
    		<div class="col s12 m4 offset-m4">
    			<div class="card">
    				<div class="card-action teal darken-2 white-text">
    					<h3>Login</h3>
    				</div>
    				
    				<div class="card-content grey darken-4">
    					<div class="form-field">
	    					<label for="username"><b>Username</b></label>
	    					<span v-if="isUsername" class="red-text">
	    						&nbsp;&nbsp;Please enter the username
	    					</span>
	    					<input type="text" name="username" v-model="username"
	    					class="white-text">
    					</div><br>
    					
    					<div class="form-field">
	    					<label for="password"><b>Password</b></label>
	    					<span v-if="isPassword" class="red-text">
	    						&nbsp;&nbsp;Please enter the password
	    					</span>
	    					<input type="password" name="password" v-model="password"
	    					class="white-text">
    					</div><br>
    					
    					<div class="form-field">
	    					<button class="btn-large waves-effect waves-dark"
	    					style="width:100%"
	    					@click="aProduct">
	    						Login
	    					</button>
    					</div><br>
    				</div>
    			</div>
    		</div>
    	</div>		  
    	`,
    mounted () {
		if (this.test == 1) {
			this.test = 0;
			router.push('/');
		}
		axios.get('rest/svi').then(response =>(this.ed=response.data))
    },
    methods: {
    	aProduct : function() {
			event.preventDefault();
		
			let ime = document.getElementsByName("username")[0]
			let sifra = document.getElementsByName("password")[0]
			this.isUsername = false;
			this.isPassword = false;
			//ime.style.background = "white"
			//sifra.style.background ="white"
			
			if(this.username ==="")
			{
				//ime.style.background = "red"
				this.isUsername = true;
				this.returnFlag = 1;
			}
			else {
				this.isUsername = false;
			}
			if(this.password ===""){
				//ime.style.background = "white"
				//sifra.style.background = "red"
				this.isPassword = true;
				this.returnFlag = 1;
			}
			else {
				this.isPassword = false;
			}
			if (this.returnFlag == 1) {
				this.returnFlag = -1;
				return;
			}
			else this.returnFlag = -1;
			
			this.isPassword = false;
			//ime.style.background = "white"
			//sifra.style.background ="white"
			
			axios
				.post('rest/login', {username:this.username, password:this.password})
				.then(response => {
					let profil = document.getElementsByName("pom")[0];
					//console.log(profil.firstElementChild.firstElementChild);
					let headerDiv = profil.firstElementChild;
					
					const nodes = headerDiv.childNodes;
					let list = nodes[2];
					let listElements = list.childNodes;
					console.log(listElements)
					
					//let p  =profil.getElementsByTagName("button")[0];
					//let p1  =profil.getElementsByTagName("button")[1];
					//let p2  =profil.getElementsByTagName("button")[2];
					let dodavanjeOsoblja = listElements[0].firstElementChild;
					let prikazKorisnika = listElements[2].firstElementChild;
					let prikazProfila = listElements[4].firstElementChild;
					
					//let manFacilityBtn = profil.getElementsByTagName("button")[4];
					//let trainerInfoBtn = profil.getElementsByTagName("button")[5];
					let manFacilityInfo = listElements[14].firstElementChild;
					let trainerInfoInfo = listElements[16].firstElementChild;
					
					axios.get('rest/currentUser').then(response=> {
						this.user = response.data
						console.log(this.user);
						//prikazProfila.hidden = false;
						if(this.user.role == "Administrator"){
							dodavanjeOsoblja.hidden=false;
							prikazKorisnika.hidden=false;
							//console.log(p2)
						}
						else if (this.user.role == "Manager") {
							console.log(manFacilityInfo);
							manFacilityInfo.hidden = false;	
						}
						else if (this.user.role == "Trainer") {
							console.log(trainerInfoInfo)
							trainerInfoInfo.hidden = false;
						}
					})	
					//console.log(p)
					//p2.hidden =false;
					//window.location.reload();
					//router.push(`/`)
					//this.$router.go(0);
					localStorage.setItem('test', 'login')
					router.push(`/`)
				})
				.catch(response => {
					toast('Wrong username and/or password!')
				})	    
		}
   }
});