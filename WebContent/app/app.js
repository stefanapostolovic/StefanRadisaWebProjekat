const Facilitys = { template: '<facilities></facilities>' }
const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [//{ path: '/', name: 'home', component: Product},
		{ path: '/', name: 'home', component: Facilitys}
]
});

var app = new Vue({
	router,
	el:'#products'
});