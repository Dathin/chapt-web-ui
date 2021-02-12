//TODO: Better name
import { Message } from '../domain/chapt/Message';

export class ChaptService {

	private readonly webSocket: WebSocket;

	constructor(private readonly messageReceived: (message: Message) => void) {
		this.webSocket = new WebSocket('ws://localhost:8080/chat');
		this.initWebSocket();
	}

	sendMessage = (message: Message) => {
		this.webSocket.send(JSON.stringify(message));
		this.createMessageElement(message.content, 'right');
	};

	private initWebSocket = () => {
		this.webSocket.onopen = () => {
			this.webSocket.send(JSON.stringify({ content: localStorage.getItem('token') }));
		};
		this.webSocket.onmessage = (messageEvent: MessageEvent) => {
			this.receiveMessage(messageEvent);
		};
	};

	private receiveMessage = (messageEvent: MessageEvent) => {
		const message = <Message>JSON.parse(messageEvent.data);
		this.messageReceived(message);
	};

	private createMessageElement = (content: string, textAlign: string): void => {
		const messageElement = document.createElement('div');
		messageElement.style.textAlign = textAlign;
		messageElement.textContent = content;
		// this.backgroundElement.appendChild(messageElement);
	};

}
