Vue.component("login", { 
	data: function () {
	    return {
	    user: {username:null, password:null, name:"pedro", surename:null, gender:null, dateOfBirth:null,role:"" ,trainingHistory:null,
	membership:null,
	sportFacility:null,
	visitedFacilities:null,
	points:null,
	customerType:{}
},

	     username : "",
	     password : "",
		image:""
	    }
	},
	    template: ` 
    	<div class="centar">
	<form id="forma" >
		<table>
			<tr><td>Username</td><td><input type="text" name="username" v-model="username"></td></tr>
			<tr><td>Password</td><td><input type="password" name="password" v-model="password"></td></tr>							
			<tr><td><input type="submit" v-on:click="aProduct" value="Login"></td></tr>
		</table>
	</form>


    	</div>		  
    	`,
    mounted () {
	axios.get('rest/svi').then(response =>(this.ed=response.data))
    },
    methods: {
    	aProduct : function() {
			event.preventDefault();
		
			let ime = document.getElementsByName("username")[0]
			let sifra = document.getElementsByName("password")[0]
			ime.style.background = "white"
			sifra.style.background ="white"
			
			if(this.username ==="")
			{
				ime.style.background = "red"
				return;
			}else if(this.password ===""){
				ime.style.background = "white"
				sifra.style.background = "red"
				return;
			}
			ime.style.background = "white"
			sifra.style.background ="white"
		
			const jedan = axios.post('rest/login', {username:this.username, password:this.password})
				
			const dva = axios.post('rest/ulogovani',{username:this.username, password:this.password})
			axios.all([jedan,dva])
				.then(axios.spread((first_response, second_response) => {
					let profil = document.getElementsByName("pomPom")[0]
					let p  =profil.getElementsByTagName("button")[0];
					let p1  =profil.getElementsByTagName("button")[1];
					let p2  =profil.getElementsByTagName("button")[2];
				this.user=second_response.data
				
				if(this.user.role ==="Administrator"){
						p.hidden=false;
						p1.hidden=false;
						
					}
					
					p2.hidden =false;
					router.push(`/`)
					
				}))
				.catch(response => {
					toast('Wrong username and/or password!')
	
						})
						
				
					
					
					    
		}
   }
});