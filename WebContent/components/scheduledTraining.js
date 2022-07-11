Vue.component("selectedTraining", { 
	data: function () {
	    return {id: '',
	    user:null,
		training:null,
	    history:{"id":null,"time":null,"applicationDateTime":null,"training":null,"user":null,"coach":null,"isDeleted":false},
		isDate:false,
		isTime:false,
		poruka:'',
		personalni:false
		
		}
	},
	    template: ` 
    			<div class="container shrink" style="margin-top:-3%">
    			<h1>Prijavi se na trening</h1>
    			<br></br>
				
				
				<form>
				<table>
					<tr>
					<td>Unesite zeljeni datum:</td>
					<td><input type="date"  name="type" v-model="history.applicationDateTime"></td>
					</tr>
					<tr v-if="personalni">
					<td>Unesite zeljeno vreme:</td>
					<td><span v-if="isTime" class="red-text">
	    				&nbsp;&nbsp;Zauzet termin
	    			</span><input type="time" name="type" v-model="history.time"></td>
					</tr>
					<tr>
					
					<span v-if="isDate" class="red-text">
	    				&nbsp;&nbsp;{{poruka}}
	    			</span>
					<a class="waves-effect waves-light btn-small teal darken-2" @click="dodajTrening">
	    					<i class="material-icons left">business</i>Prijavi
	    				</a>
					
	    				
					</td>
					</tr>
					
				</table>
				</form>
				
			</div>  
    	`,
    mounted () {
		
		this.id = localStorage.getItem("selectedTraining");
		
		
		axios.all([
			this.getLoggedUser(),
			this.getTraining(),
		])
		.then(axios.spread((first_response, second_response) => {
			this.user = first_response.data;
			this.training = second_response.data;	
			let date = new Date();

			let day = ("0" + date.getDate()).slice(-2);
			let month = ("0" + (date.getMonth() + 1)).slice(-2);

			let today = date.getFullYear() + "-" + (month) + "-" + (day);
			let hours = ("0" + date.getHours()).slice(-2);
			let minutes = ("0" + (date.getMinutes() + 1)).slice(-2);

			this.history.time = (hours) + ":" + (minutes)
			this.history.applicationDateTime=today
						console.log(this.history)
			
			
			if(this.training.trainingType =="Personalni"){
				this.personalni=true;
			}
			if(this.user.membership == null)	
			{
				this.isDate =true;	//ako je korisnik nema
				this.poruka = "Nemate clanarinu"
			}else if(this.user.membership.status==false){
				this.isDate =true; //ako je istekla
				this.poruka = "Clanarina je istrkla"
			}
			
			
			

			
		}))
    },
    methods: {  
		getLoggedUser() {
			return axios.get('rest/currentUser');
		},
		getTraining() {
			return axios.get('rest/trainings/getTraining/'+this.id);
		},
		obracunaj:function(){
			event.preventDefault();
		/*	
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
			}
			})*/
		},
		dodajTrening(){
			event.preventDefault();
			this.history.user = this.user
			this.history.training = this.training; 
			this.history.coach = this.training.trainer;
			let trHours = this.history.time.split(':')[0]
			trHours = parseInt(trHours);
			let trDuration =parseInt(this.training.duration);
			let facStart = parseInt(this.training.sportFacility.startTime.split(':')[0]);
			let facEnd = parseInt(this.training.sportFacility.endTime.split(':')[0]);
			if(trHours<facStart || trHours > facEnd || (trHours + trDuration) >facEnd){
				this.isTime = true;
				return;
			}
			
			let pomD = new Date(this.history.applicationDateTime);
			let datum1 = new Date(this.user.membership.expirationDate)
			if(pomD.getTime()>datum1.getTime()){
				this.isDate=true;
				this.poruka = "Clanarina ne vazi"
				return;	
			}
		
			
			if(!this.isDate){
			axios.post('rest/newTraining/addTraining', this.history)
				.then(response => {
					router.push(`/`)
				})
			}
		
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