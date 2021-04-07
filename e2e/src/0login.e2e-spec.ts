import { IndexPage } from './index.po';
import { browser, by, element, logging } from 'protractor';

// browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');

describe('Login', () => {
  let page: IndexPage;

  beforeEach(() => {
    page = new IndexPage();
  });

  it('Debe iniciar sesion', () => {
    page.navigateTo();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    page.navigateTo();

    browser.driver.manage().window().setSize(1536, 824);
    element(by.xpath('//*[@id="navbarColor03"]/ul[2]/li[1]/a')).click();

    var texto_nombre_de_usuario = element(by.xpath('/html/body/app-root/app-login/div/div/div/div/form/div[1]/label'))
    expect<any>(texto_nombre_de_usuario.getText()).toEqual('Nombre de Usuario');
    // @ts-ignore
    element(by.xpath('//*[@id="nombreUsuario"]')).clear().sendKeys('alejandro1cortes');
    // @ts-ignore
    element(by.xpath('//*[@id="password"]')).clear().sendKeys('alejandro1password');
    browser.sleep(5)
    element(by.xpath('/html/body/app-root/app-login/div/div/div/div/form/div[3]/button')).click();
    browser.sleep(30000)
    var texto_bienvenida = element(by.xpath('/html/body/app-root/app-index/div/div/div/h1'));
    expect<any>(texto_bienvenida.getText()).toEqual('Bienvenido/a');
    var texto_nombreUsuario = element(by.xpath('/html/body/app-root/app-index/div/div/div/h2'))
    expect<any>(texto_nombreUsuario.getText()).toEqual('alejandro1cortes');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.WARNING,
    } as logging.Entry));
  });
});
