Vue.component("facilitys", { 
	data: function () {
	    return {
	      facilitys: null
	    }
	},
	    template: ` 
    	<div>
    		<h3>Prikaz proizvoda</h3>
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Naziv dogadjaja</th>
	    			<th>Datum i vreme pocetka</th>
					<th>Datum i vreme zavrsetka</th>
					<th>Lokacija</th>
					<th>cena</th>
					<th>opis</th>
					<th></th>
	    		</tr>
	    			
	    		<tr v-for="(p, index) in products">
	    			<td>{{p.name}}</td>
	    			<td>{{p.pocetak}}</td>
				<td>{{p.kraj}}</td>
					<td>{{p.lokacija}}</td>
				<td>{{p.cena}}</td>
					<td>{{p.opis}}</td>
	    			<td>
	    			<button v-on:click="deleteProduct(p.id, index)">Obriši</button>
	    				</td>
	    		</tr>
	    	</table>
   	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/facilities/')
          .then(response => (this.facilitys = response.data))
    },
    methods: {
    }
});