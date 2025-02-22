import { Component, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-modal.component.html',
  styleUrls: ['./branch-modal.component.css'],
})
export class BranchModalComponent {
  beforeCode: string;
  afterCode: string;
  diffResultBefore: SafeHtml = '';
  diffResultAfter: SafeHtml = '';

  constructor(
    public dialogRef: MatDialogRef<BranchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.beforeCode = data.beforeCode;
    this.afterCode = data.afterCode;
    this.generateDiff();
  }

  ngAfterViewInit() {
    const closeButton = this.elementRef.nativeElement.querySelector('button.close');
    if (closeButton) {
      closeButton.focus();
    }
  }

  closeModal(): void {
    this.dialogRef.close();
    this.router.navigate(['/status']);
  }

  generateDiff() {
    const beforeLines = this.beforeCode.split('\n');
    const afterLines = this.afterCode.split('\n');

    let beforeCodeHighlighted = '';
    let afterCodeHighlighted = '';

    let i = 0; // Index for beforeLines
    let j = 0; // Index for afterLines

    while (i < beforeLines.length || j < afterLines.length) {
        const beforeLine = beforeLines[i] || '';
        const afterLine = afterLines[j] || '';

        if (beforeLine === afterLine) {
            // Lines are the same
            beforeCodeHighlighted += `<span style="color: grey;">${beforeLine}</span>\n`;
            afterCodeHighlighted += `<span style="color: grey;">${afterLine}</span>\n`;
            i++;
            j++;
        } else {
            // Lines are different
            if (beforeLine) {
                beforeCodeHighlighted += `<span style="color: red; text-decoration: line-through;">${beforeLine}</span>\n`;
            }
            if (afterLine) {
                afterCodeHighlighted += `<span style="color: green;">${afterLine}</span>\n`;
            }
            // Move to the next line in the appropriate array
            if (beforeLine && !afterLine) {
                // If there's a line in before but not in after, just move the before index
                i++;
            } else if (!beforeLine && afterLine) {
                // If there's a line in after but not in before, just move the after index
                j++;
            } else {
                // If both lines are different, move both indices
                i++;
                j++;
            }
        }
    }

    // Sanitize the highlighted HTML
    this.diffResultBefore = this.sanitizer.bypassSecurityTrustHtml(beforeCodeHighlighted);
    this.diffResultAfter = this.sanitizer.bypassSecurityTrustHtml(afterCodeHighlighted);
}
}