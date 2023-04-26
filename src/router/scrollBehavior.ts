import { RouterScrollBehavior } from 'vue-router';

const scrollBehavior: RouterScrollBehavior = (to, _, savedPosition) =>
	savedPosition
		? savedPosition
		: to.hash
		? { el: to.hash }
		: { top: 0, left: 0 };

export default scrollBehavior;
