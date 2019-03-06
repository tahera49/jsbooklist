import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalComponent } from '../shared/components/modal/modal.component';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JS Book List';
  sortForm: FormGroup;
  filterForm: FormGroup;
  booksJson: any;
  largeImage: any;
  pagesFilterJson: any[];
  showFilters: boolean = false;
  @ViewChild('imageModal') imageModal: ModalComponent;

  ngOnInit() {
    this.sortForm = new FormGroup({
      sortOptions: new FormControl('pages')
    });

    this.filterForm = new FormGroup({
      showOnly: new FormControl('')
    });
    this.filterForm.controls['showOnly'].setValue(localStorage.getItem('pageNumber'));
    this.sortForm.controls['sortOptions'].setValue(localStorage.getItem('sortOption'));
    this.booksJson = [
      {
        "cover": {
          "large": "https://covers.oreillystatic.com/images/9780596517748/lrg.jpg",
          "small": "https://covers.oreillystatic.com/images/9780596517748/cat.gif"
        },
        "title": "JavaScript: The Good Parts",
        "author": "Douglas Crockford",
        "releaseDate": "12/2008",
        "pages": 172,
        "link": "http://shop.oreilly.com/product/9780596517748.do"
      },
      {
        "cover": {
          "large": "https://covers.oreillystatic.com/images/9780596000486/lrg.jpg",
          "small": "https://covers.oreillystatic.com/images/9780596000486/cat.gif"
        },
        "title": "JavaScript: The Definitive Guide",
        "author": "David Flanagan",
        "releaseDate": "11/2001",
        "pages": 936,
        "link": "http://shop.oreilly.com/product/9780596000486.do"
      },
      {
        "cover": {
          "large": "https://covers.oreillystatic.com/images/0636920025832/lrg.jpg",
          "small": "https://covers.oreillystatic.com/images/0636920025832/cat.gif"
        },
        "title": "Learning JavaScript Design Patterns",
        "author": "Addy Osmani",
        "releaseDate": "08/2012",
        "pages": 254,
        "link": "http://shop.oreilly.com/product/0636920025832.do"
      },
      {
        "cover": {
          "large": "https://covers.oreillystatic.com/images/0636920027713/lrg.jpg",
          "small": "https://covers.oreillystatic.com/images/0636920027713/cat.gif"
        },
        "title": "JavaScript Enlightenment",
        "author": "Cody Lindley",
        "releaseDate": "12/2012",
        "pages": 166,
        "link": "http://shop.oreilly.com/product/0636920027713.do"
      },
      {
        "cover": {
          "large": "https://covers.oreillystatic.com/images/0636920033141/lrg.jpg",
          "small": "https://covers.oreillystatic.com/images/0636920033141/cat.gif"
        },
        "title": "Programming JavaScript Applications",
        "author": "Eric Elliott",
        "releaseDate": "07/2014",
        "pages": 254,
        "link": "http://shop.oreilly.com/product/0636920033141.do"
      },
      {
        "cover": {
          "large": "https://covers.oreillystatic.com/images/0636920047124/lrg.jpg",
          "small": "https://covers.oreillystatic.com/images/0636920047124/cat.gif"
        },
        "title": "Practical Modern JavaScript",
        "author": "Nicolas Bevacqua",
        "releaseDate": "07/2017",
        "pages": 334,
        "link": "http://shop.oreilly.com/product/0636920047124.do"
      }
    ]
    this.sortFilter();
    this.filerByNumbers();
  }

  imageModalOpen(event: any) {
    console.log("event::" + event.currentTarget.innerText);
    for (var i = 0; i < this.booksJson.length; i++) {
      if (event.currentTarget.innerText === this.booksJson[i].title) {
        this.largeImage = this.booksJson[i].cover.large;
        this.imageModal.show();
      }
    }
  }

  sortFilter() {
    console.log("Radio button value" + this.sortForm.get('sortOptions').value);
    if (this.sortForm.get('sortOptions').value == "pages") {
      this.booksJson.sort((a: any, b: any) => parseFloat(a.pages) - parseFloat(b.pages));
      console.log("sorted json" + JSON.stringify(this.booksJson));
    } else if (this.sortForm.get('sortOptions').value == "date") {
      this.booksJson.sort(function (a: any, b: any) {
        var yearA = a.releaseDate.split('/').slice(1, 2).join(' ').toUpperCase();
        var yearB = b.releaseDate.split('/').slice(1, 2).join(' ').toUpperCase();
        if (yearA < yearB) {
          return -1;
        }
        if (yearA > yearB) {
          return 1;
        }
        return 0;
      });
      console.log("sorted json" + JSON.stringify(this.booksJson));
    } else if (this.sortForm.get('sortOptions').value == "name") {
      this.booksJson.sort(function (a: any, b: any) {
        var surnameA = a.author.split(' ').slice(-1).join(' ').toUpperCase();
        var surnameB = b.author.split(' ').slice(-1).join(' ').toUpperCase();
        if (surnameA < surnameB) {
          return -1;
        }
        if (surnameA > surnameB) {
          return 1;
        }
        return 0;
      });
      console.log("sorted json" + JSON.stringify(this.booksJson));
    }
    localStorage.setItem('sortOption', this.sortForm.get('sortOptions').value);
  }

  filerByNumbers() {
    console.log("Numbers::" + this.filterForm.controls.showOnly.value);
    var currentPageFiler = [];
    for (var i = 0; i < this.booksJson.length; i++) {
      if ((this.filterForm.controls.showOnly.value === this.booksJson[i].pages) || (this.filterForm.controls.showOnly.value < this.booksJson[i].pages)) {
        currentPageFiler.push(this.booksJson[i]);
      }
    }
    this.pagesFilterJson = currentPageFiler;
    console.log("New Pages JSON:: " + JSON.stringify(this.pagesFilterJson));
    if (this.pagesFilterJson.length != 0) {
      this.showFilters = true;
    }
    localStorage.setItem('pageNumber', this.filterForm.controls.showOnly.value);
  }

  resetForm() {
    this.filterForm.reset();
    this.sortForm.reset();
    this.showFilters = false;
  }
}
