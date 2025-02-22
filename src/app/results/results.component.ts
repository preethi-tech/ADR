import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../services/solution/solution.service';
import { BranchModalComponent } from '../branch-modal/branch-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  loading: boolean = true;
  skeletonArray = new Array(3);
  userQuery: string = '';
  solutions: any[] = [];
  isModalOpen: boolean = false;
  beforeCode: string = '';
  afterCode: string = '';

  @ViewChild('solutionContainer', { static: false }) solutionContainer!: ElementRef;

  constructor(private route: ActivatedRoute, private solutionService: SolutionService, public dialog: MatDialog) {}

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

  openModal(): void {
    // Set the before and after code snippets
    this.beforeCode = `def calculate_sum(numbers):
    # This function calculates the sum of a list of numbers
    total = 0
    for num in numbers:
        total += num  # This will cause a TypeError if non-numeric values are present
    return total

def calculate_average(numbers):
    # This function calculates the average of a list of numbers
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)  # Potential division by zero error

def print_results(sum_value, average_value):
    print("Sum: " + str(sum_value))
    print("Average: " + str(average_value))

def main():
    # Main execution
    numbers = [1, 2, 'three', 4, 5]  # Contains a string, which will cause a TypeError
    sum_value = calculate_sum(numbers)
    average_value = calculate_average(numbers)
    print_results(sum_value, average_value)

if __name__ == "__main__":
    main()`;

    this.afterCode = `def calculate_sum(numbers):
    # This function calculates the sum of a list of numbers
    numbers = [num for num in numbers if isinstance(num, (int, float))]  # Filter non-numeric values
    total = 0
    for num in numbers:
        total += num
    return total

def calculate_average(numbers):
    # This function calculates the average of a list of numbers
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)  # Potential division by zero error

def print_results(sum_value, average_value):
    print("Sum: " + str(sum_value))
    print("Average: " + str(average_value))

def main():
    # Main execution
    numbers = [1, 2, 'three', 4, 5]  # Contains a string, which will be filtered out
    sum_value = calculate_sum(numbers)
    average_value = calculate_average(numbers)
    print_results(sum_value, average_value)

if __name__ == "__main__":
    main()`;

    // Log the before and after code to ensure they are set correctly
    console.log('Before Code:', this.beforeCode);
    console.log('After Code:', this.afterCode);

    // Open the modal with the before and after code
    this.dialog.open(BranchModalComponent, {
      data: {
        beforeCode: this.beforeCode,
        afterCode: this.afterCode
      },
      width: '90vw', 
      height: '100vh',
      maxWidth: '90vw',
      maxHeight: '100vh',
      panelClass: 'custom-dialog-container'
    });
  }
}