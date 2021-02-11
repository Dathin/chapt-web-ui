import axios from './ChaptAxios';

describe('should be chapt axios interceptor', () => {

	it('should set local storage token as auth header for chapt main backend', () => {
		expect(axios.defaults.headers.common['Authorization']).toContain('Bearer ');
	});

});
