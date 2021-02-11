jest.mock('sweetalert2');
import Swal from 'sweetalert2';
import { AlertService } from './AlertService';

describe('should be an alert service', () => {
	let alertService: AlertService;

	beforeEach(() => {
		alertService = new AlertService();
	});

	it('should call sweetalert with error properties', () => {
		const text = 'text';
		const swalOptions = {
			title: 'Oooops...',
			text,
			icon: 'error',
		};

		alertService.error(text);

		expect(Swal.fire).toHaveBeenCalledWith(swalOptions);
	});
});
