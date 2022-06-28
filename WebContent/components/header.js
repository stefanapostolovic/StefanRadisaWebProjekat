Vue.component("zaglavlje", { 
	data: function () {
	    return {
			showLogReg: true,
			showProfile: false,
			showLogOut: false,
			showBackBtn: false
	    }
	},
	    template: ` 
    	<div class="right">
<button v-on:click="dodavanjeOsoblja" name="treneri" hidden>Dodavanje osoblja</button>
<button v-on:click="prikazKorisnika" name="korisnici" hidden>Pregled korisnika</button>
<button v-on:click="prikaz" name="Profil" hidden>Prikaz profila</button>
<button v-on:click="aProduct">Prijava</button>  <button v-on:click="registracija">Registracija</button> &nbsp;&nbsp; &nbsp;                                      

	
    	</div>		  
    	`,
    mounted () {
		this.showLogReg = true;
		this.showProfile = false;
		this.showLogOut = false;
		this.showBackBtn = false;
    },
    methods: {
	
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
			router.push(`/radnici`);	    
		},
		registracija : function() {
			this.showLogReg = false;
			this.showProfile = true;
			this.showLogOut = true;
			router.push(`/registracija`);	
			    
		},
		
		prikazKorisnika:function(){
			router.push(`/users`);
		},
		
		logout() {
			axios
				.post('rest/logout')
				.then(response => {
					this.showLogReg = true;
					this.showProfile = false;
					this.showLogOut = false;
					router.push(`/`);
				})
		},
		
		back() {
			this.showBackBtn = false;
			router.push(`/`);	
		}
   }
});