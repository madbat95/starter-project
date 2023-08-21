import { Component } from '@angular/core';
import { ScrapeService } from 'src/app/shared/services/scrape.service';
import { EditorContentService } from 'src/app/shared/services/editor-content.service';
import { MetaDataService } from 'src/app/shared/services/meta-data.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'scrape-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  scrapedContent: string = '';
  url: any = 'https://blog.hubspot.com/website/privacy-policy-wordpress';
  constructor(
    private scrapeService: ScrapeService,
    private editorContentService: EditorContentService,
    private metaDataService: MetaDataService,
    private tableLoaderService: TableLoaderService
  ) {}

  scrapeWebsite() {
    this.tableLoaderService.summernoteLoader = true;
    this.scrapeService.getHTML(this.url).subscribe({
      next: (data: any) => {
        console.log('data', data);
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        const metaTitle = new DOMParser()
          .parseFromString(data, 'text/html')
          .querySelector('title').textContent;
        this.metaDataService.setMetaTitle(metaTitle);

        const metaDescription = new DOMParser()
          .parseFromString(data, 'text/html')
          .querySelector("meta[name='description']")
          .getAttribute('content');
        this.metaDataService.setMetaDescription(metaDescription);

        const mainContent = new DOMParser()
          .parseFromString(data, 'text/html')
          .querySelector('main');

        // console.log(mainContent);
        this.dataCleaning(mainContent);

        this.editorContentService.updateScrapedData(mainContent.innerHTML);
        // this.summernote.onEditorKeyUp(mainContent);
        this.tableLoaderService.summernoteLoader = false;
      },
      error: (error) => {
        console.log('error:', error);
        this.tableLoaderService.summernoteLoader = false;
      },
    });
  }

  dataCleaning(mainContent: any) {
    // Remove images
    mainContent.querySelectorAll('img').forEach((image) => image.remove());

    // Remove forms
    mainContent.querySelectorAll('form').forEach((form) => form.remove());

    // Remove header (assuming it's inside a common container with a specific ID or class)
    const headerContainer = mainContent.querySelector('#header-container');
    if (headerContainer) {
      headerContainer.remove();
    }

    // Remove footer (assuming it's inside a common container with a specific ID or class)
    const footerContainer = mainContent.querySelector('#footer-container');
    if (footerContainer) {
      footerContainer.remove();
    }

    // Remove iframes
    mainContent.querySelectorAll('iframe').forEach((iframe) => iframe.remove());

    // Remove <nav> element
    mainContent.querySelectorAll('nav').forEach((nav) => nav.remove());

    // Remove <aside> element and its content
    mainContent.querySelectorAll('aside').forEach((aside) => aside.remove());

    // Remove empty tags with no content and skipping lines
    mainContent.querySelectorAll('*').forEach((element) => {
      if (!element.textContent.trim() && !element.innerHTML.trim()) {
        element.remove();
      } else {
        this.removeAllClasses(element); // Call the function to remove classes
      }
    });
  }

  removeAllClasses = (element) => {
    element.removeAttribute('class');
  };
}
