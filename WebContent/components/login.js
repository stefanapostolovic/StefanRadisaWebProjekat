Vue.component("login", { 
	data: function () {
	    return {
	     ed:null,
	     username : "",
	     password : ""
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
			
			axios
				.post('rest/login', {username:this.username, password:this.password})
				.then(response => {
					let profil = document.getElementsByName("pom")[0];
					let p  =profil.getElementsByTagName("button")[0];
					let p1  =profil.getElementsByTagName("button")[1];
		
					if(this.username==="2"){
						p.hidden=false;
					}
					console.log(p)
					p1.hidden =false;
				})
				.catch(response => {
					toast('Wrong username and/or password!')
						})	    
		}
   }
});