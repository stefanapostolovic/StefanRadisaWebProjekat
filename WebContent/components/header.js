Vue.component("zaglavlje", { 
	data: function () {
	    return {
			loggedUser: null,	
		
			showLogReg: true,
			showProfile: false,
			showLogOut: true,
			showHomeBtn: true,
			
			showAdminButtons: false,
			showManagerInfo: false,
			showTrainerInfo: false,
	    }
	},
	    template: ` 
    	<nav class="teal darken-2">
    		<div class="nav-wrapper" id="testDiv">
    			<a href="#" class="brand-logo">
    				  &nbsp;&nbsp;Fit Corp<i class="material-icons large">&nbsp;&nbsp;&nbsp;spa</i>
    			</a>
    			<ul id="nav-mobile" class="right hide-on-med-and-down" name="list">
    			
    				<li><a v-if="showAdminButtons" @click="dodavanjeOsoblja" id="treneri">
    					<font size="+2">Dodavanje osoblja &nbsp;&nbsp;</font>
    				</a>
    				</li>
    				
    				<li><a v-if="showAdminButtons" @click="prikazKorisnika" id="korisnici">
    					<font size="+2">Pregled korisnika &nbsp;&nbsp;</font></a>
    				</li>
    				
    				<li><a v-if="showProfile" v-on:click="prikaz" name="Profil">
    					<font size="+2">Prikaz profila &nbsp;&nbsp;</font>
    				</a></li>
    				
    				<li><a v-if="showLogReg" v-on:click="aProduct">
    					<font size="+2">Prijava &nbsp;&nbsp;</font> &nbsp;&nbsp;
    				</a></li>
    				
    				<li><a v-if="showLogReg" v-on:click="registracija">
    					<font size="+2">Registracija &nbsp;&nbsp;</font> &nbsp;&nbsp;
    				</a></li>
    				
    				<li><a v-if="showLogOut" @click="logout">
    					<font size="+2">Logout &nbsp;&nbsp</font>
    				</a></li>
    				
    				<li><a v-if="showHomeBtn" @click="goHome">
    					<font size="+2">Home &nbsp;&nbsp;</font>
    				</a></li>
    				
    				<li><a v-if="showManagerInfo" @click="viewManagerFacilityInfo" name="manInfo">
    					<font size="+2">View facility</font>
    				</a></li>
    				
    				<li><a v-if="showTrainerInfo" @click="viewTrainerInfo" name="traInfo">
    					<font size="+2">View info</font>
    				</a></li>
    				
    			</ul>                                      
    	</div>
    	</nav>		  
    	`,
    mounted () {
		/*this.showLogReg = true;
		this.showProfile = false;
		this.showLogOut = false;
		this.showHomeBtn = false;*/
		axios
			.get('rest/currentUser')
			.then(response => {
				this.loggedUser = response.data;
				
				if (this.loggedUser == null || this.loggedUser === '') {
					this.showLogReg = true;
					this.showProfile = false;
					
					return;
				}
				else {
					this.showLogReg = false;
					this.showLogOut = true;
					this.showProfile = true;
				}
				
				if (this.loggedUser.role == "Administrator") {
					this.showAdminButtons = true;
				}
				else {
					this.showAdminButtons = false;
				}
				
				if (this.loggedUser.role == "Manager") {
					this.showManagerInfo = true;
				}
				else {
					this.showManagerInfo = false;
				}
				
				if (this.loggedUser.role == "Trainer") {
					this.showTrainerInfo = true;
				}
				else {
					this.showTrainerInfo = false;
				}
			})
    },
    methods: {
		viewTrainerInfo() {
			router.push('/trainerInfo');
		},
	
		viewManagerFacilityInfo() {
			router.push('/managerInfo');
		},
		
		prikaz : function() {
			//this.showHomeBtn = true;
			router.push(`/profil`);	    
		},
		
    	aProduct : function() {
			//this.showLogReg = false;
			//this.showProfile = true;
			//this.showLogOut = true;
			router.push(`/login`);	    
		},
		dodavanjeOsoblja : function() {
			//this.showHomeBtn = true;
			router.push(`/radnici`);	    
		},
		registracija : function() {
			//this.showHomeBtn = true;
			//this.showLogReg = false;
			//this.showProfile = true;
			//this.showLogOut = true;
			router.push(`/registracija`);	
			    
		},
		
		prikazKorisnika:function(){
			//this.showHomeBtn = true;
			router.push(`/users`);
		},
		
		logout() {
			axios
				.post('rest/logout')
				.then(response => {
					this.showLogReg = true;
					this.showProfile = false;
					//this.showLogOut = false;
					this.showAdminButtons = false;
					this.showManagerInfo = false;
					this.showTrainerInfo = false;
					
					/*let profil = document.getElementsByName("pom")[0];
					let p  =profil.getElementsByTagName("button")[0];
					let p1  =profil.getElementsByTagName("button")[1];*/
					
					//p.hidden=true;
					//p1.hidden=true;
					
					this.loggedUser = null;
					router.push(`/`);
				})
		},
		
		goHome() {
			//this.showHomeBtn = false;
			if (this.loggedUser == null || this.loggedUser === '') {
				this.showLogReg = true;
			}
			else {
				this.showLogReg = false;
			}
			router.push(`/`);	
		}
   }
});