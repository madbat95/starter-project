import { Component } from '@angular/core';
import { ScrapeService } from 'src/app/shared/services/scrape.service';
import { EditorContentService } from 'src/app/shared/services/editor-content.service';
import { MetaDataService } from 'src/app/shared/services/meta-data.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';
import { WordCounterService } from '../../service/word-counter.service';

@Component({
  selector: 'scrape-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  scrapedContent: string = '';
  constructor(
    private scrapeService: ScrapeService,
    private editorContentService: EditorContentService,
    private metaDataService: MetaDataService,
    private tableLoaderService: TableLoaderService,
    public wordCounterService: WordCounterService
  ) {}

  scrapeWebsite() {
    this.tableLoaderService.summernoteLoader = true;
    this.scrapeService.getHTML(this.wordCounterService.siteUrl).subscribe({
      next: (data: any) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        const metaTitle = doc.querySelector('title').textContent;

        this.metaDataService.setMetaTitle(metaTitle);

        const metaDescription =
          doc
            .querySelector("meta[name='description']")
            ?.getAttribute('content') || '';

        this.metaDataService.setMetaDescription(metaDescription);

        const mainContent =
          doc.querySelector('main') || doc.querySelector('body');

        this.dataCleaning(mainContent);

        this.wordCounterService.editorContent = mainContent.innerHTML;
        this.editorContentService.updateScrapedData(mainContent.innerHTML);
        this.tableLoaderService.summernoteLoader = false;
      },
      error: (error) => {
        this.tableLoaderService.summernoteLoader = false;
      },
    });
  }

  dataCleaning(mainContent: any) {
    // Remove images if they exist
    const images = mainContent.querySelectorAll('img');
    if (images.length > 0) {
      images.forEach((image) => image.remove());
    }

    // Remove forms if they exist
    const forms = mainContent.querySelectorAll('form');
    if (forms.length > 0) {
      forms.forEach((form) => form.remove());
    }

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

    // Remove iframes if they exist
    const iframes = mainContent.querySelectorAll('iframe');
    if (iframes.length > 0) {
      iframes.forEach((iframe) => iframe.remove());
    }

    // Remove <nav> elements if they exist
    const navs = mainContent.querySelectorAll('nav');
    if (navs.length > 0) {
      navs.forEach((nav) => nav.remove());
    }

    // Remove <aside> elements if they exist
    const asides = mainContent.querySelectorAll('aside');
    if (asides.length > 0) {
      asides.forEach((aside) => aside.remove());
    }

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
