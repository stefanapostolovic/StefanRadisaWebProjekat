Vue.component("promoCode", {
	data: function () {
		return {
			newCode: {},
			
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
			</div>
		`,
		
		mounted () {
			
		},
		
		methods: {
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
				
				axios
					.post('rest/codes/createCode', this.newCode)
					.then(response => {
						router.push('/');
					})
					.catch(response => {
						toast('That code already exists!');
					})
			}
		}
});












