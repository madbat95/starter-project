import { Component } from '@angular/core';
import { ScrapeService } from 'src/app/shared/services/scrape.service';

@Component({
  selector: 'scrape-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  scrapedContent: string = '';
  url: any = 'https://www.google.com/';
  constructor(private scrapeService: ScrapeService) {}

  scrapeWebsite() {
    // Input value = websiteUrl
    // const urlInput = document.querySelector('#websiteUrl') as HTMLInputElement;

    // Check if URL is provided
    // if (!this.url) {

    //   return;
    // }

    // Call the getHTML method from the ScrapeService
    this.scrapeService.getHTML(this.url).subscribe({
      next: (data: any) => {
        // Use DOMParser to parse the fetched HTML
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        console.log(htmlDoc.body);
        // Extract and manipulate the content as needed
        // const mainContent = htmlDoc.querySelector('main'); // Adjust the selector as per your website structure

        // // Clean up the mainContent as described in the previous response

        // // Set the cleaned content to the scrapedContent variable
        // this.scrapedContent = mainContent.innerHTML;

        // // Log the scraped content to the console
        // console.log('Scraped Content:', this.scrapedContent);
      },
      error: (error) => {
        console.log('error:', error);
      },
    });
  }
}
