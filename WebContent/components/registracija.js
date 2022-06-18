Vue.component("registracija", {
	data: function () {
		    return {
		      id : -1,
		      product: {id: '', name:'pedro', username:null, password:null, surename:null, gender:null, dateofbirth:null }
		    }
	},
	template: ` 
<div style="width:800px; margin:0 auto;">
	<header></header>
	<form>
	<table>
		
	<tr>
		<td>Korisnicko ime:</td>
		<td><input id="username" v-model = "product.username"  type = "text" name = "username">
		</td>
	</tr>
	<tr>
		<td>Lozinka:</td>
			<td><input type="password" v-model = "product.password"  name="password"></td>

	</tr>
	<tr>
		<td>Ime:</td>
		<td><input id="ime" v-model = "product.name"  type = "text" name = "name">	
	</tr>
	<tr>
		<td>Prezime:</td>
		<td><input type="text" v-model = "product.surename"  name="surename"></td>
	</tr>
	<tr>
		<td>Pol:</td>
		<td><select name="pol" id="pol" v-model = "product.gender" >
 				  <option value="Male">Musko</option>
				  <option value="Female">Zensko</option>
			</select></td>
	</tr>
	<tr>
		<td>Datum rodjenja:</td>
		<td><input type="date" id="rodjenje" name="rodjenje" v-model = "product.dateofbirth"/></td>
	</tr>
	
	<tr>
		<td >
		<input type="submit"  v-on:click = "editProduct" value="Poslaji">
		<input type="reset" value="Ponisti">
		</td>
		<td></td>
	</tr>
		
	</table>
	</form>
</div>		  
`
	, 
	methods : {
		editProduct : function () {
			event.preventDefault();
					if(products.name==""){
																	
					}
					//axios.post('rest/products', this.product).then(response => (router.push(`/products`)));
				
		}
	},
	mounted () {
		
    }
});