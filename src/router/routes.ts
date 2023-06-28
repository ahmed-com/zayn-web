import { T } from 'ramda';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import MainHeader from '../layout/MainHeader.vue';
import HomeHeader from '../layout/HomeHeader.vue';
import MainFooter from '../layout/MainFooter.vue';
import MainLeftSidebar from '../layout/MainLeftSidebar.vue';
import MapRightSidebar from '../layout/MapRightSidebar.vue';
import MainRightSidebar from '../layout/MainRightSidebar.vue';
import PlainHeader from '../layout/PlainHeader.vue';

import Home from '../views/Home.vue';

import ifAuth from './ifAuth.guard'
import ifNotAuth from './ifNotAuth.guard'

const routes: RouteRecordRaw[] = [
	{
		path: '/search',
		name: 'Search',
		components: {
			header: MainHeader,
			footer: MainFooter,
			leftDrawer: MainLeftSidebar,
			rightDrawer: MapRightSidebar,
			main: ()=> import('../views/Search.vue')
		},
		beforeEnter: T,
		props: {main:true, rightDrawer: true}
	},

	{
		path: '/register-as-seller',
		name: 'SellerLogin',
		components: {
			header: PlainHeader,
			footer: MainFooter,
			main: ()=> import('../views/SellerLogin.vue')
		},
		beforeEnter: ifNotAuth
	},

	{
		path:'/register',
		name: 'Register',
		components: {
			header: PlainHeader,
			footer: MainFooter,
			main: ()=> import('../views/Register.vue'),
		},
		beforeEnter: ifNotAuth,
	},

	{
		path:'/login',
		name: 'Login',
		components: {
			header: PlainHeader,
			footer: MainFooter,
			main: ()=> import('../views/Login.vue'),
		},
		beforeEnter: ifNotAuth,
	},

	{
		path: '/users/:userId',
		components: {
			main: ()=> import('../views/UserView/Index.vue'),
			leftDrawer: MainLeftSidebar,
			header: MainHeader,
		},
		children: [
			{
				path: '',
				name: 'User',
				component: ()=> import('../views/UserView/Info.vue'),
				alias: 'info',
			},
			{
				path: 'discussion',
				component: ()=> import('../views/UserView/Chat.vue'),
                name: 'UserDiscussion'
			},
		],
		props: {main: true, leftDrawer: true},
		beforeEnter: T,
	},

	{
		path: '/orders/:orderId',
		components: {
			main: ()=> import('../views/OrderView/Index.vue'),
			leftDrawer: MainLeftSidebar,
			header: MainHeader,
		},
		children: [
			{
				path: '',
				name: 'Order',
				component: ()=> import('../views/OrderView/Info.vue'),
				alias: 'info',
			},
			{
				path: 'discussion',
				component: ()=> import('../views/OrderView/Chat.vue'),
                name: 'OrderDiscussion'
			},
			{
				path: 'meetup',
				component: ()=> import('../views/OrderView/Meetup.vue'),
                name: 'OrderMeetup'
			},
		],
		props: {main: true, leftDrawer: true},
		beforeEnter: T,
	},

	{
		path: '/dashboard',
		name: 'Dashboard',
		beforeEnter: ifAuth,
		components: {
			main: ()=> import('../views/Dashboard.vue'),
			leftDrawer: MainLeftSidebar,
			header: MainHeader
		}
	},

	{
		path: '/profile',
		name: 'Profile',
		beforeEnter: ifAuth,
		components: {
			main: ()=> import('../views/Profile.vue'),
			leftDrawer: MainLeftSidebar,
			header: MainHeader
		}
	},

	{
		path: '/about-us',
		name: 'AboutUs',
		beforeEnter: T,
		components: {
			main: ()=> import('../views/AboutUs.vue'),
			footer: MainFooter,
			header: MainHeader
		}
	},

	{
		path: '/contact-us',
		name: 'ContactUs',
		beforeEnter: T,
		components: {
			main: ()=> import('../views/ContactUs.vue'),
			footer: MainFooter,
			header: MainHeader
		}
	},

	{
		path: '/privacy-policy',
		name: 'PrivacyPolicy',
		beforeEnter: T,
		components: {
			main: ()=> import('../views/PrivacyPolicy.vue'),
			footer: MainFooter,
			header: MainHeader
		}
	},

	{
		path: '/terms-of-use',
		name: 'TermsOfUse',
		beforeEnter: T,
		components: {
			main: ()=> import('../views/TermsOfUse.vue'),
			footer: MainFooter,
			header: MainHeader
		}
	},

	{
		path: '/redirect/:encodedRoute',
		name: 'Redirect',
		components: {
			main: ()=> import('../views/Redirect.vue')
		},
		beforeEnter: T
	},

	{
		path: '/',
		name: 'Home',
		components: {
			main: Home,
			footer: MainFooter
		},
		beforeEnter: T
	},

	{
		path: '/generic-crud',
		name: 'Orders',
		components: {
			header: MainHeader,
			footer: MainFooter,
			leftDrawer: MainLeftSidebar,
			rightDrawer: MainRightSidebar,
			main: ()=> import('../views/Generic.vue')
		},
		beforeEnter: ifAuth,
		props: {main:true, rightDrawer: true}
	},

	{
		path: '/generic-chart',
		name: 'Chart',
		components: {
			header: MainHeader,
			footer: MainFooter,
			leftDrawer: MainLeftSidebar,
			main: ()=> import('../views/GenericChart.vue')
		},
			beforeEnter: ifAuth,
			props: {main:true}
	},

	{
		path: '/generic-form',
		name: 'Form',
		components: {
			header: MainHeader,
			footer: MainFooter,
			leftDrawer: MainLeftSidebar,
			main: ()=> import('../views/GenericForm.vue')
		},
		beforeEnter: ifAuth,
		props: {main:true}
	},

	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		components: {
			main: ()=> import('../views/404.vue'),
			leftDrawer: MainLeftSidebar,
			header: MainHeader,
			footer: MainFooter
		},
		props: {main: true},
		beforeEnter: T,
	}
];

export default routes;
