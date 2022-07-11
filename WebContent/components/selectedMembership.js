Vue.component("selectedMembership", { 
	data: function () {
	    return {id: '',
	    user:null,
		membership:{"identifier":null,"membershipType":null,"paymentDate":null,"expirationDate":null,"price":null,"status":"true","numberAppointments":"3","user":null,"number":null,"counter":null},
	    code:null,
		stringCode:"",
		isDate:false,
		price:false
		}
	},
	    template: ` 
    			<div class="container shrink" style="margin-top:-3%">
    			<h1>Membership</h1>
    			<br></br>
				
				<h3 class="teal darken-2" style="margin-bottom:5%">
					Types of membership
				</h3>
				<table>
						<tr class="tableRowBorder"">
						<td>Identifikator</td>
						<td>
								{{this.membership.identifier}}
						</td>
						</tr>
					<tr class="tableRowBorder"">
					<td>Tip članarine</td>
						<td>
							{{this.membership.membershipType}}
						</td>
					</tr>
					<tr class="tableRowBorder"">
						<td>Cena</td>
						<td>
								{{this.membership.price}}
						</td>
						</tr>
						<tr class="tableRowBorder"">
						<td>Dnevni broj termina</td>
						<td>							
								{{this.membership.numberAppointments}}
						</td>
						</tr>
						<tr class="tableRowBorder"">
						<td>Ukupan broj termina</td>
						<td>
								{{this.membership.number}}
						</td>
						
						</tr>
							<tr class="tableRowBorder"">
						<td>Datum placanja</td>
						<td>
								{{this.membership.paymentDate}}
						</td>
						</tr></tr>
							<tr class="tableRowBorder"">
						<td>Datum vazenja</td>
						<td>
								{{this.membership.expirationDate}}
						</td>
						</tr>
				</table>
				<p></p>
				<form>
				<table>
					<tr>
					<td>Unesite promo kod:</td>
					<td><span v-if="isDate" class="red-text">
	    				&nbsp;&nbsp;Nevalidan kod
	    			</span><input type="text" name="type" v-model="stringCode"></td>
					<td><button v-on:click="obracunaj">Obracunaj</button></td>
					</tr>
					<tr>
					<td></td>
					<a class="waves-effect waves-light btn-small teal darken-2" @click="dodajClanarinu">
	    					<i class="material-icons left">business</i>Kupi
	    				</a>
					
	    				
					</td>
					</tr>
					
				</table>
				</form>
				
			</div>  
    	`,
    mounted () {
		let datm = new Date()
		
		
		this.id = localStorage.getItem("selectedMembership");
		
		
		axios.all([
			this.getLoggedUser(),
			this.getMembership(),
		])
		.then(axios.spread((first_response, second_response) => {
			this.user = first_response.data;
					
			
			this.membership=second_response.data
			this.membership.price = this.membership.price * (1 - this.user.customerType.discount /100)
			this.membership.status=true;
		this.membership.paymentDate=datm.toLocaleDateString ();
		if(this.membership.membershipType == "Godisnja")
			this.membership.expirationDate =addDays(datm,365)
		else if(this.membership.membershipType == "Mesecna"){
			this.membership.expirationDate =addDays(datm,30)

		}else{
			this.membership.expirationDate =addDays(datm,7)

		}
			
		}))
		
		
		
		
		/*axios.get('rest/membership/'+this.id).then(response =>{this.membership=response.data
		this.membership.paymentDate=datm.toLocaleDateString ();
		if(this.membership.membershipType == "Godisnja")
			this.membership.expirationDate =addDays(datm,365)
		else if(this.membership.membershipType == "Mesecna"){
						this.membership.expirationDate =addDays(datm,30)

		}else{
						this.membership.expirationDate =addDays(datm,7)

		}
		})*/
		
    },
    methods: {  
		getLoggedUser() {
			return axios.get('rest/currentUser');
		},
		getMembership() {
			return axios.get('rest/membership/'+this.id);
		},
		obracunaj:function(){
			event.preventDefault();
			if( this.stringCode=="" ){
				this.isDate=true;
				return;	
			}
			axios.get('rest/codes/findCode/'+this.stringCode).then(response=>{
			this.isDate=false;
			this.code=response.data;
			
			if( this.code ==null || this.code==""){
				this.isDate=true;
				return;	
			}
			let pomD = new Date();
			let pomD1 = new Date(this.code.expiryDate);
			if(pomD1.getTime()<pomD.getTime()){
				this.isDate=true;
				return;	
			}
			if( this.code.isDeleted || this.code.useAmount <=0){
				console.log("da li ovde udje")
				this.isDate=true;
				return;	
			}else{
				if(!this.price){
				this.price=true;
					this.membership.price = this.membership.price * (1 - this.code.discountPercentage/100)
				}
				this.code.useAmount = parseInt(this.code.useAmount) - 1; 
				if(this.code.useAmount <0){
					this.code.useAmount = 0;
				}
				
			}
			return axios.put('rest/codes/update/'+this.code.code,this.code)
			}).then(response=>{this.code=response.data;console.log(this.code)})
		},
		dodajClanarinu(){
			event.preventDefault();
			this.membership.isDeleted = false;
			this.user.membership=this.membership;
			
			axios.put('rest/updateUser/' + this.user.username, this.user).
				then(response => {
					this.user = response.data;
					router.push(`/`);
				});		
		
		}
   }
});

function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
	copy.setHours(23)
	copy.setMinutes(59)
	copy.setSeconds(59)
  return copy.toLocaleString  ()
}