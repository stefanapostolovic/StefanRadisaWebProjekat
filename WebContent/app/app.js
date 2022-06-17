const Facilitys = { template: '<facilities></facilities>' }
const Header = { template: '<zaglavlje></zaglavlje>' }
const Login = { template: '<login></login>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [{ path: '/zaglavlje', component: Header},
		{ path: '/', name: 'home', component: Facilitys},
		{ path: '/login', component: Login},
]
});

var app = new Vue({
	router,
	el:'#products'
});