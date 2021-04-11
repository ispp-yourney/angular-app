import { IndexPage } from './index.po';
import { browser, by, element, logging } from 'protractor';
import { environment } from '../../src/environments/environment';

// browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');

var iniciaSesion = function (page: IndexPage) {
  page.navigateTo();
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
  page.navigateTo();

  browser.driver.manage().window().setSize(1536, 824);
  element(by.xpath('//*[@id="navbarColor03"]/ul[2]/li[1]/a')).click(); //Botón para ir al iniciar sesión

  // @ts-ignore
  element(by.xpath('//*[@id="nombreUsuario"]')).clear().sendKeys('alejandro1cortes');
  // @ts-ignore
  element(by.xpath('//*[@id="password"]')).clear().sendKeys('alejandro1password');
  browser.sleep(1000)
  element(by.xpath('/html/body/app-root/app-login/div/div/div/div/form/div[3]/button')).click(); // Botón para loguarse
  browser.sleep(1000)
}

var accedePerfil = function () {
  element(by.xpath('//*[@id="navbarColor03"]/ul[2]/li/a')).click(); // Click NombreUsuario 
  element(by.xpath('//*[@id="navbarColor03"]/ul[2]/li/div/a[1]')).click(); //Click Mi Perfil
  browser.sleep(1000)
  var texto_usuario_perfil = element(by.xpath('/html/body/app-root/app-profile/div/div/div/div[1]/div/div/div/div/h4')) //Nombre de usuario en el perfil 
  expect<any>(texto_usuario_perfil.getText()).toEqual('alejandro1cortes');
}

var accedeItinerariosDeUsuario = function () {
  ////*[@id="navbarColor03"]/ul[2]/li/div/a[2]
  ///html/body/app-root/app-profile/div/div/div/div[1]/div/div/div/div[2]/button[2]
  element(by.xpath('/html/body/app-root/app-profile/div/div/div/div[1]/div/div/div/div[2]/button[2]')).click(); //Boton de itinerarios del usuario 
  browser.sleep(5000)
  expect<any>(element(by.xpath('/html/body/app-root/app-itinerarylist/div[1]/h3/h2')).getText()).toEqual('alejandro1cortes'); //Texto de listado itinerarios


  expect<any>(element(by.xpath('/html/body/app-root/app-itinerarylist/div[3]/ul/li[2]/a')).getText()).toEqual('1');
  expect<any>(element(by.css('li.page-item.active')).getText()).toEqual('1');
}

var accedeItinerario = function () {
  element(by.xpath('/html/body/app-root/app-itinerarylist/div[2]/a[1]')).click(); //Accede al primer itinerario
  expect<any>(element(by.xpath('/html/body/app-root/app-itineraryview/section/nav/div/div[1]/h4')).getText()).toEqual('Una semana en Los Ángeles');
}

var compruebaItinerario = function () {
  var list = element.all(by.xpath('/html/body/app-root/app-itineraryview/section/article/div')); //Todos los dias
  // @ts-ignore
  expect(list.count()).toBe(6);

  // @ts-ignore
  expect(element(by.xpath('/html/body/app-root/app-itineraryview/section/nav/div/div/div/button')).isDisplayed()).toBe(true); //Boton de eliminar
  element(by.xpath('/html/body/app-root/app-itineraryview/section/article/div[1]/div[1]/button')).click(); //Primer dia
  browser.sleep(1000)
  expect<any>(element(by.xpath('//*[@id="landmark1"]/div/div/div[2]/div/div[1]/h5')).getText()).toEqual('Teatro Chino de Grauman'); //Titulo del primer dia
  
}

describe('Itinerarios', () => {
  let page: IndexPage;

  beforeEach(() => {
    page = new IndexPage();
  });

  it('Debe listar itinerarios', () => {
    iniciaSesion(page);
    browser.sleep(2000);

    accedePerfil();
    browser.sleep(5);

    //accedeItinerariosDeUsuario();
  });


  it('Debe mostrar itinerarios', () => {
    iniciaSesion(page)
    browser.sleep(2000)

    accedePerfil()
    browser.sleep(5)

    /*accedeItinerariosDeUsuario();

    accedeItinerario();

    compruebaItinerario();*/

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.WARNING,
    } as logging.Entry));
  });
});
