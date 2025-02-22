import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

interface Issue {
  title: string;
  description: string;
  resolution: string;
  comments: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // fullText: string = 'Hello User, How may I help you?';
  fullTexts: string[] = [
    'Hello User, Welcome to ADR!',
    'Enter your defect details to start the resolution process...'
  ];
  displayedText: string = '';
  typingSpeed: number = 50; // Speed of typing effect in milliseconds
  showCursor: boolean = true; // Cursor visibility flag

  userQuery: string = '';
  suggestions: string[] = [
  
    'PSCALE-226270 - System slow after latest patch',
    'PSCALE-245688 - Division by Zero and Type Mismatch Errors',
    'PSCALE-269756 - API not returning expected data in production',
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.typeText();
  }

  typeText() {
    let i = 0;
    let fullIndex = 0;

    const interval = setInterval(() => {
      if (fullIndex < this.fullTexts.length) {
        if (i < this.fullTexts[fullIndex].length) {
          this.displayedText += this.fullTexts[fullIndex].charAt(i);
          i++;
        } else {
          this.displayedText += '\n'; // New line for next message
          i = 0;
          fullIndex++;
        }
      } else {
        clearInterval(interval);
        this.showCursor = false; // Hide cursor when typing is complete
      }
    }, this.typingSpeed);
  }

  searchQuery() {

    if (!this.userQuery.trim()) {
      return;
    }

    console.log('Searching for:', this.userQuery);
    const queryId = uuidv4();
    const query = {'queryId': queryId, 'query': this.userQuery};
    sessionStorage.setItem('userQuery', JSON.stringify(query));
    this.router.navigate(['/results'], { queryParams: { queryId: queryId } });
  }

  selectSuggestion(suggestion: string) {
    this.userQuery = suggestion;
  }
}

