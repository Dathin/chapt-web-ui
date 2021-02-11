import Swal from 'sweetalert2';

export class AlertService {
  error = async (text: string): Promise<void> => {
  	await Swal.fire({
  		title: 'Oooops...',
  		text,
  		icon: 'error',
  	});
  };
}
