Vue.component("users", { 
	data: function () {
	    return {
	      users: null
	    }
	},
	    template: ` 
    	<div>
    		<h3>Prikaz korisnika</h3>
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Ime</th>
	    			<th>Prezime</th>
					<th>Korisnicko ime</th>
					<th>Pol</th>
				</tr>
	    			
	    		<tr v-for="(p, index) in users">
	    			<td>{{p.name}}</td>
	    			<td>{{p.surename}}</td>
				<td>{{p.username}}</td>
					<td>{{p.gender}}</td>
				</tr>
	    	</table>
   	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/svi')
          .then(response => (this.users = response.data))
    },
    methods: {
    	
    }
});