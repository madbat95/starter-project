import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests

@Component({
  selector: 'scrape-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  scrapedContent: string = '';

  constructor(private http: HttpClient) {}

  scrapeWebsite() {
    // input value = websiteUrl
    const urlInput = document.querySelector('#websiteUrl') as HTMLInputElement;
    const url = urlInput.value;

    // Check if URL is provided
    if (!url) {
      alert('Please enter a website URL.');
      return;
    }

    // Use the CORS Anywhere proxy URL
    const corsProxyURL = 'https://corsproxy.io/?';

    // Perform an HTTP GET request using HttpClient to fetch the website content through the proxy
    this.http
      // .get(corsProxyURL + encodeURIComponent(url), { responseType: 'text' })
      .get(`reporting/scrap/${url}/`, { responseType: 'text' })
      .subscribe(
        (data) => {
          // Use DOMParser to parse the fetched HTML
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(data['html'], 'text/html');

          // Extract and manipulate the content as needed
          const mainContent = htmlDoc.querySelector('main'); // Adjust the selector as per your website structure

          // Clean up the mainContent as described in the previous response

          // Set the cleaned content to the scrapedContent variable
          this.scrapedContent = mainContent.innerHTML;

          // Log the scraped content to the console
          console.log('Scraped Content:', this.scrapedContent);
        },
        (error) => {
          alert('Failed to fetch the website. Please check the URL.');
        }
      );
  }
}
