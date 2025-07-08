import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter, tap } from 'rxjs';
import { IBreadCrumb } from '@core/interfaces/bread-cumb.interface';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  /**
     * La lista de migajas de pan que se muestran en la barra de navegación.
     */
  public breadcrumbs: IBreadCrumb[];

  /**
   * Constructor del componente.
   * @param router El router de Angular.
   * @param activatedRoute El ActivatedRoute de Angular.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    console.log(this.breadcrumbs);
  }

  /**
   * Método que se ejecuta al iniciar el componente.
   * Se suscribe al evento de cambio de ruta y actualiza la lista de migajas de pan correspondiente a la ruta actual.
   */
  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      tap(() => this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root))
    ).subscribe();

  }

  /**
   * Construye la lista de migajas de pan correspondiente a la ruta actual.
   * @param route El ActivatedRoute de la ruta actual.
   * @param url La URL actual.
   * @param breadcrumbs La lista de migajas de pan actual.
   * @returns La lista de migajas de pan correspondiente a la ruta actual.
   */
  private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {

    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data["breadcrumb"] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    console.log({ label, path })

    const lastRoutePart = path!.split('/').pop();
    const isDynamicRoute = lastRoutePart!.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart!.split(':')[1];
      path = path!.replace(lastRoutePart!, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {

      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  public isLastBreadcrumb(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }
}
