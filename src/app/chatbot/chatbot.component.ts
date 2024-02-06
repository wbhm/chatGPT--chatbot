import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  // A reference to the container where messages will be displayed in the UI.
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  name = 'Harvey';
  
  // An array to store the chat messages (both user and bot responses).
  messages: ChatMessage[] = [];

  // A string variable to capture and handle user input text.
  userInput: string = '';

  // URL to the OpenAI API for sending and receiving chat completions.
  apiUrl = 'https://api.openai.com/v1/chat/completions';

  // URL to your backend server for retrieving the API key.
  backendUrl = '[your vercel deployment link]/api/getApiKey.js';

  // Variables to track the loading state and any errors that occur.
  loading: boolean = false;
  error: string | null = null;

  // Paths to the images used for the user and the bot in the chat UI.
  userImagePath = 'assets/img/Jim.png';
  botImagePath = 'assets/img/botImage.png';

  // Variables to hold the formatted response from the API and any custom error messages.
  formattedResponse: SafeHtml = '';
  customErrorMessage: string | null = null;

  // Additional variables to track the loading state and occurrence of errors.
  isLoading: boolean = false;
  errorOccurred: boolean = false;
  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }


 //OnInit Lifecycle Hook: Executes when the component is initialized.
 //Here, it's used to add an initial welcome message to the chat from the chatbot.
 ngOnInit() {
    this.messages.push({ text: "Hi, I'm {{ name }}! How can I help you today?", user: false });
  }

// ngAfterViewChecked runs after Angular updates the view.
ngAfterViewChecked() {
    // Calls scrollToBottom to scroll the chat to the latest message.
    this.scrollToBottom();
}

// Scrolls the message container to show the most recent chat message.
private scrollToBottom(): void {
    try {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight; // Scroll to the bottom of the chat.
    } catch (err) { /* Error handling is ignored for simplicity. */ }
}

// Adjusts the height of the text input to fit the content as the user types.
autoGrow(event: any): void {
    const textArea = event.target;
    textArea.style.height = 'auto'; // Reset height.
    textArea.style.height = textArea.scrollHeight + 'px'; // Expand to fit content.
}
}
