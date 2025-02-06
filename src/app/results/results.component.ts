import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../services/solution/solution.service';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  loading: boolean = true;
  skeletonArray = new Array(3);
  userQuery: string = '';
  solutions: any[] = [];

  @ViewChild('solutionContainer', { static: false }) solutionContainer!: ElementRef;

  constructor(private route: ActivatedRoute, private solutionService: SolutionService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryId = params['queryId'];
      if (queryId) {
        const storedQuery = JSON.parse(sessionStorage.getItem('userQuery') || '{}');
        if (storedQuery.queryId === queryId) {
          this.userQuery = storedQuery.query;
          this.fetchSolutionsByQuery(this.userQuery);
        }
      }
    });
  }

  fetchSolutionsByQuery(query: string) {
    this.solutionService.getSolutions().subscribe((data: any) => {
      console.log(data);
      if (data && data[query]) {
        this.solutions = data[query]; 
      } else {
        this.solutions = data["default"]; 
      }

      this.loading = false; 
    }, (error) => {
      console.error('Error fetching solutions:', error);
      this.loading = false; 
    });
  }

  scrollLeft() {
    this.solutionContainer?.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.solutionContainer?.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
