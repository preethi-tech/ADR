import { Component } from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: false,
  
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  // Sample task data
  tasks = [
    { name: 'PSCALE-245685', description: 'Application crashes on startup',  status: ['2', '2', '1', '0', '0', '0','0'] },
    { name: 'PSCALE-242286', description: 'System slow after latest patch is applied',  status: ['2', '2', '2', '1', '0', '0','0'] },
    { name: 'PSCALE-246787', description: 'API not returning expected data in production',  status: ['2', '2', '2', '2', '1', '0','0'] },
    { name: 'PSCALE-246788', description: 'Node is not disconnected when backup operation is in progress',  status: ['2', '2', '2', '3', '30', '30','30'] },
    { name: 'PSCALE-246789', description: 'Import error : Module pytest is not found',  status: ['2', '1', '0', '0', '0', '0','0'] },
    { name: 'PSCALE-246798', description: 'Attribute "islocal" is not found in test.py',  status: ['2', '2', '2', '2', '2', '1','0'] },
    
  ];
  userDefinedSteps = [ 'Check-in', 'Build', 'Testing','Verify','Raise CR', 'Merge','Verify'];
  

  getStepClass(step: string): string {
    switch (step) {
      case '0':
        return 'not-started-step'; // For Not Started
      case '1':
        return 'in-progress-step'; // For In Progress
      case '2':
        return 'completed-step'; // For Completed
      case '3':
        return 'error-step'; // For Error
      default:
        return '';
    }
  }
 
}