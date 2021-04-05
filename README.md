# Repositorio de desarrollo backend para la aplicación Yourney
## Estado de indicadores de integración continua
### Travis CI
 **Estado de Travis CI en rama main:** [![Build Status](https://travis-ci.org/ispp-yourney/angular-app.svg?branch=main)](https://travis-ci.org/ispp-yourney/yourney-backend)
 **Estado de Travis CI en rama develop:** [![Build Status](https://travis-ci.org/ispp-yourney/angular-app.svg?branch=develop)](https://travis-ci.org/ispp-yourney/yourney-backend)

### SonarCloud
**Bugs:** [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=bugs)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Code Smells:** [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=code_smells)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Cobertura de pruebas:** [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=coverage)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Líneas duplicadas** [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Líneas de código** [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=ncloc)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Mantenibilidad** [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Calidad de código** [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Confiabilidad** [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Seguridad** [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=security_rating)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Deuda técnica** [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=sqale_index)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

**Vulnerabilidades** [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ispp-yourney_angular-app&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=ispp-yourney_angular-app)

## Introducción
Desde Yourney, ofrecemos   la   posibilidad   de   compartir   rutas   turísticas   entre   usuarios   de   todo   el   mundo   y promocionarlas por parte de establecimientos e instituciones, con el fin de enriquecer la experiencia que obtengan en sus viajes nuestros usuarios, y de aportar valor a las organizaciones que colaboren con nuestra organización.

Para obtener más información acerca del proyecto, invitamos a revisar nuestra landing page, en la que podrá obtener información acerca de nuestro proyecto, objetivos, e integrantes. [Yourney](ispp-yourney.github.io)

## Estructura del código
En este repositorio, se encuentra el código fuente de la parte de backend correspondiente al proyecto Yourney. 
Las tecnologías que emplea son:

* SpringBoot como framework de desarrollo.
* PostgreSQL como base de datos del proyecto.

En el siguiente diagrama, puede encontrar una simplificación de la estructura de la aplicación.
![Diagrama de componentes de la aplicación](https://user-images.githubusercontent.com/55277082/111430780-26c09280-86fb-11eb-8611-aa4cb67376ad.PNG)

Cada vez que un usuario realiza una operación de push al repositorio, sea la rama que sea, se lanza el procedimiento de integración continua, mientras que en las ramas develop y master son las únicas en las que se realiza la automatización del despliegue, y únicamente sobre develop el análisis de la calidad del código.


# Configuración de YourneyAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
