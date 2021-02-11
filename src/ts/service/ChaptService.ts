//TODO: Better name
export class ChaptService {

  private readonly webSocket: WebSocket;

  constructor(private readonly backgroundElement: HTMLDivElement) {
		this.webSocket = new WebSocket('ws://localhost:8080/chat');
		this.initWebSocket();
	}

	sendMessage = (content: string, to: number) => {
		this.webSocket.send(JSON.stringify({ content, to }));
		this.createMessageElement(content, 'right');
	};

	private initWebSocket = () => {
		this.webSocket.onopen = () => {
			this.webSocket.send(JSON.stringify({ content: localStorage.getItem('token') }));
		};
		this.webSocket.onmessage = () => {
			console.log('aaa');
		};
	};

	private createMessageElement = (content: string, textAlign: string): void => {
		const messageElement = document.createElement('div');
		messageElement.style.textAlign = textAlign;
		messageElement.textContent = content;
		this.backgroundElement.appendChild(messageElement);
	};

}
