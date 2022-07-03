Vue.component("zaglavlje", { 
	data: function () {
	    return {
			showLogReg: true,
			showProfile: false,
			showLogOut: false,
			showBackBtn: false,
			
			showAdminButtons: false
	    }
	},
	    template: ` 
    	<nav class="teal darken-2">
    		<div class="nav-wrapper" id="testDiv">
    			<a href="#" class="brand-logo">
    				  &nbsp;&nbsp;Fit Corp<i class="material-icons large">&nbsp;&nbsp;&nbsp;spa</i>
    			</a>
    			<ul id="nav-mobile" class="right hide-on-med-and-down" name="list">
    				<li><a @click="dodavanjeOsoblja" id="treneri" hidden>
    					Dodavanje osoblja
    				</a></li>
    				<li><a @click="prikazKorisnika" id="korisnici" hidden>
    					Pregled korisnika</a>
    				</li>
    				<li><a v-if="showProfile" v-on:click="prikaz" name="Profil" hidden>
    					Prikaz profila
    				</a></li>
    				<li><a v-if="showLogReg" v-on:click="aProduct">
    					Prijava &nbsp;&nbsp;
    				</a></li>
    				<li><a v-if="showLogReg" v-on:click="registracija">
    					Registracija &nbsp;&nbsp;
    				</a></li>
    				<li><a v-if="showLogOut" @click="logout">
    					Logout
    				</a></li>
    				<li><a v-if="showBackBtn" @click="back">
    					Back
    				</a></li>
    				<li><a @click="viewManagerFacilityInfo" hidden name="manInfo">
    					View facility
    				</a></li>
    				<li><a @click="viewTrainerInfo" hidden name="traInfo">
    					View info
    				</a></li>
    			</ul>                                      
    	</div>
    	</nav>		  
    	`,
    mounted () {
		this.showLogReg = true;
		this.showProfile = false;
		this.showLogOut = false;
		this.showBackBtn = false;
    },
    methods: {
		viewTrainerInfo() {
			router.push('/trainerInfo');
		},
	
		viewManagerFacilityInfo() {
			router.push('/managerInfo');
		},
		
		prikaz : function() {
			this.showBackBtn = true;
			router.push(`/profil`);	    
		},
		
    	aProduct : function() {
			this.showLogReg = false;
			this.showProfile = true;
			this.showLogOut = true;
			router.push(`/login`);	    
		},
		dodavanjeOsoblja : function() {
			this.showBackBtn = true;
			router.push(`/radnici`);	    
		},
		registracija : function() {
			this.showBackBtn = true;
			this.showLogReg = false;
			this.showProfile = true;
			this.showLogOut = true;
			router.push(`/registracija`);	
			    
		},
		
		prikazKorisnika:function(){
			this.showBackBtn = true;
			router.push(`/users`);
		},
		
		logout() {
			axios
				.post('rest/logout')
				.then(response => {
					this.showLogReg = true;
					this.showProfile = false;
					this.showLogOut = false;
					showAdminButtons = false;
					
					let profil = document.getElementsByName("pom")[0];
					let p  =profil.getElementsByTagName("button")[0];
					let p1  =profil.getElementsByTagName("button")[1];
					
					p.hidden=true;
					p1.hidden=true;
					
					router.push(`/`);
				})
		},
		
		back() {
			this.showBackBtn = false;
			router.push(`/`);	
		}
   }
});