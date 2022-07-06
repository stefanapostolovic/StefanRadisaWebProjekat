Vue.component("promoCode", {
	data: function () {
		return {
			newCode: {},
			allCodes: [],
			
			code: '',
			expirationDate: '',
			uses: '',
			discount: '',
			
			//validacija
			isCode: false,
			isExpirationDate: false,
			isUses: false,
			isDiscount: false,
			
			returnFlag: -1
		}
	},
		template: `
			<div class="container">
				<h1 style="margin-top:10%; margin-bottom:10%">Create promo code</h1>
				
				<form>
					<table>	
						<tr>
							<td>Code</td>
							<td>
								<span v-if="isCode" class="red-text">
	    							&nbsp;&nbsp;Please enter the code
	    						</span>
								<input type="text" v-model="code">
							</td>
						</tr>
						<tr>	
							<td>Expiration date</td>
							<td>
								<span v-if="isExpirationDate" class="red-text">
	    							&nbsp;&nbsp;Please enter the expiration date
	    						</span>
								<input type="date" v-model="expirationDate">
							</td>
						</tr>
						<tr>	
							<td>Uses</td>
							<td>
								<span v-if="isUses" class="red-text">
	    							&nbsp;&nbsp;Please enter the use amount
	    						</span>
								<input type="number" v-model="uses">
							</td>
						</tr>
						<tr>	
							<td>Discount (%)</td>
							<td>
								<span v-if="isDiscount" class="red-text">
	    							&nbsp;&nbsp;Please enter the discount (in %)
	    						</span>
								<input type="number" v-model="discount">
							</td>
						</tr>
						<tr>
							<td>
								<button class="btn" @click="createCode">Confirm</button>
								<input type="reset" class="btn" value="Reset">
							</td>
							<td></td>
						</tr>
					</table>
				</form>
				
				<h3 class="teal darken-2" style="margin-top:10%; margin-bottom:5%; text-align:center">
					Code list
				</h3>
				<table style="margin-bottom:10%">
					<tr class="tableRowBorder">	
						<th>Code</th>
						<th>Expiration date</th>
						<th>Uses</th>
						<th>Discount (%)</th>
						<th></th>
					</tr>
					
					<tr v-for="(p, index) in allCodes" v-if="p.isDeleted == false"
					class="tableRowBorderBoth">
						<td>{{p.code}}</td>
						<td>{{p.expiryDate}}</td>
						<td>{{p.useAmount}}</td>
						<td>{{p.discountPercentage}}</td>
						<td>
							<a class="btn-floating btn-large waves-effect waves-light teal darken-2"
				    		  @click="deleteCode(p)"
				    		  style="margin-right: 0; margin-left:auto; display:block;">
				    		  <i class="material-icons">cancel</i>
				    		</a>
						</td>
					</tr>
				</table>
			</div>
		`,
		
		mounted () {
			axios
				.get('rest/codes/getAllCodes')
				.then(response => {
					this.allCodes = response.data;
				})
		},
		
		methods: {
			deleteCode(promoCode) {
				promoCode.isDeleted = !promoCode.isDeleted;
				axios
					.get('rest/codes/deleteCode/' + promoCode.code)
					.then(response => {
						console.log(response.data);
					})
					
			},
			
			createCode() {
				if (this.code === '') {
					this.isCode = true;
					this.returnFlag = 1;
				}
				else {
					this.isCode = false;
					this.newCode.code = this.code;
				}
				
				if (this.expirationDate === '') {
					this.isExpirationDate = true;
					this.returnFlag = 1;
				}
				else {
					this.isExpirationDate = false;
					this.newCode.expiryDate = this.expirationDate;
				}
				
				if (this.uses === '') {
					this.isUses = true;
					this.returnFlag = 1;
				}
				else {
					this.isUses = false;
					this.newCode.useAmount =this.uses;
				}
				
				if (this.discount === '') {
					this.isDiscount = true;
					this.returnFlag = 1;
				}
				else {
					this.isDiscount = false;
					this.newCode.discountPercentage = this.discount;
				}
				
				if (this.returnFlag == 1) {
					this.returnFlag = -1;
					return;
				}
				else this.returnFlag = 1;
				
				this.newCode.isDeleted = false;
				
				axios
					.post('rest/codes/createCode', this.newCode)
					.then(response => {
						this.$router.go(0);
					})
					.catch(response => {
						toast('That code already exists!');
					})
			}
		}
});












