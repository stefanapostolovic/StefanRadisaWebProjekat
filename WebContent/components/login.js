Vue.component("login", { 
	data: function () {
	    return {
	     //user:{},
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
					let p  =profil.firstChild;
					console.log(p)
					p.hidden=false;
					router.push(`/`)
				})
				.catch(response => {
					toast('Wrong username and/or password!')
				})	    
		}
   }
});