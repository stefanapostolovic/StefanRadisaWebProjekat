Vue.component("login", { 
	data: function () {
	    return {
	     user:null
	    }
	},
	    template: ` 
    	<div class="centar">
	<form id="forma">
		<table>
			<tr><td>Username</td><td><input type="text" name="username"></td></tr>
			<tr><td>Password</td><td><input type="password" name="password"></td></tr>
			<tr><td><input type="submit" v-on:click="aProduct" value="Login"></td></tr>
		</table>
	</form>


    	</div>		  
    	`,
    mounted () {
    },
    methods: {
    	aProduct : function(id, index) {
			router.push(`/`);	    
		}
   }
});