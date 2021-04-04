import { browser, by, element } from 'protractor';

export class IndexPage {
  navigateTo() {
    //var appUrl="http://localhost:4200/"
    //var appUrl="https://fe-dev-yourney.herokuapp.com/"
    var appUrl="http://localhost:4200/"
    return browser.get(appUrl) as Promise<any>;
  }
}
