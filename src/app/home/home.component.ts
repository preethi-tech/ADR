import { Component } from '@angular/core';

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
  userQuery: string = '';
  suggestions: string[] = [
    'SyntaxError due to print statement',
    'ImportError: no module named urllib2',
    'TypeError: unorderable types',
    'dict.keys() returns dict_keys object instead of list',
    'map() returns map object instead of list',
    'Division returns float instead of int',
    'Handling UnicodeDecodeError with str.decode()',
    'range() behaves differently'
  ];

  issues: Issue[] = [
    {
      title: 'SyntaxError due to print statement',
      description: "Code using print 'Hello' fails with SyntaxError: Missing parentheses in call to 'print'",
      resolution: "Updated all print statements to print('Hello') format",
      comments: "Python 3 requires parentheses for print function."
    },
    {
      title: 'ImportError: no module named urllib2',
      description: "Python 2 script using import urllib2 fails with ImportError",
      resolution: "Replaced urllib2 with urllib.request and urllib.error as per Python 3",
      comments: "urllib2 module is split into urllib.request and urllib.error in Python 3."
    },
    {
      title: 'TypeError: unorderable types',
      description: "Comparison like 'str' > 3 works in Python 2 but raises TypeError in Python 3",
      resolution: "Explicitly converted types before comparison using str() or int()",
      comments: "Python 3 does not allow ordering between different types."
    },
    {
      title: 'dict.keys() returns dict_keys object instead of list',
      description: "In Python 2, dict.keys() returns a list, but in Python 3 it returns dict_keys",
      resolution: "Converted dict.keys() to list(dict.keys()) where needed",
      comments: "Explicit conversion to list required when iterating over dict keys in Python 3."
    },
    {
      title: 'map() returns map object instead of list',
      description: "In Python 2, map() returns a list, but in Python 3 it returns an iterator",
      resolution: "Wrapped map() results in list(map(...)) where necessary",
      comments: "Python 3 returns a map object, not a list. Use list() for conversion."
    },
    {
      title: 'Division returns float instead of int',
      description: "In Python 2, 5 / 2 gives 2, but in Python 3 it gives 2.5",
      resolution: "Used // for integer division (5 // 2 gives 2)",
      comments: "Use // for integer division in Python 3."
    },
    {
      title: 'Handling UnicodeDecodeError with str.decode()',
      description: "In Python 2, str.decode('utf-8') works, but in Python 3, str is already Unicode",
      resolution: "Removed explicit decoding and ensured byte strings were properly handled",
      comments: "Python 3 strings are Unicode by default, decode() is unnecessary."
    },
    {
      title: 'range() behaves differently',
      description: "In Python 2, range() returns a list, but in Python 3 it returns an iterator",
      resolution: "Replaced range() with list(range()) where needed",
      comments: "Python 3's range() is memory-efficient, use list() to get values."
    }
  ];

  filteredIssues: Issue[] = [...this.issues]; // Display all issues by default

  // Handle the user input query
  onInputChange() {
    this.filteredIssues = this.issues.filter(issue =>
      issue.title.toLowerCase().includes(this.userQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(this.userQuery.toLowerCase())
    );
  }

  // Handle selection of suggestions
  selectSuggestion(suggestion: string) {
    this.userQuery = suggestion;
    this.onInputChange();
  }

  // Handle search query
  searchQuery() {
    this.onInputChange();
  }
}
