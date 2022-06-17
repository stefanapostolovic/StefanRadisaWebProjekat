var app = new Vue ({
	el: '#products',
	
	data() {
		return {
			title: 'Lista proizvoda',
			products: null,
			selectedProduct: {},
			mode: 'BROWSE',
			isFormHidden: true,
			feedBackMessage: '',
			isMessageVisible: false
		}	
	},
	
	mounted() {
		axios
			.get('rest/products')
			.then(response => (this.products = response.data))	
	},
	
	methods: {
		openFormAdd() {
			if (this.selectedProduct.name === undefined || (this.selectedProduct.name !== undefined 
			&& this.isFormHidden == true)) {
				this.isFormHidden = !this.isFormHidden
			}
			
			this.selectedProduct = {}
			this.mode = 'ADD'
		},
		
		openFormEdit(product) {
			if (this.isFormHidden == true || (this.isFormHidden == false &&
			this.selectedProduct === product)) {
				this.isFormHidden = !this.isFormHidden	
			}
			
			this.selectedProduct = product
			this.mode = 'EDIT'
		},
		
		createOrEditProduct () {
			if (this.mode === 'ADD') {
				axios
					.post('rest/products', this.selectedProduct)
					.then(response => {
						this.products.push(response.data)
						this.mode = 'BROWSE'
						this.isFormHidden = true
						this.selectedProduct = {}
						this.feedBackMessage = 'Proizvod uspesno kreiran'
						this.isMessageVisible = true
						setTimeout(() => {
							this.feedBackMessage = ''
							this.isMessageVisible = false
						}, 3000)
					})
			}
			else {
				axios 
					.put('rest/products/' + this.selectedProduct.id, this.selectedProduct)
					.then(response => {
						this.mode = 'BROWSE'
						this.isFormHidden = true
						this.selectedProduct = {}
						this.feedBackMessage = 'Proizvos uspesno izmenjen'
						this.isMessageVisible = true
						setTimeout(() => {
							this.feedBackMessage = ''
							this.isMessageVisible = false
						}, 3000)
					})
			}
		},
		
		deleteProduct(product) {
			this.selectedProduct = product
			
			axios
				.delete('rest/products/' + this.selectedProduct.id)
				.then(response => {
					this.products.splice(this.products.indexOf(product), 1)
					this.mode = 'BROWSE'
					this.isFormHidden = true
					this.selectedProduct = {}
					this.feedBackMessage = 'Proizvod uspesno obrisan'
					this.isMessageVisible = true
					setTimeout(() => {
						this.feedBackMessage = ''
						this.isMessageVisible = false
					}, 3000)
				})
		}
	}
}); 