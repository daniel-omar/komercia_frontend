import { PageEvent } from "@angular/material/paginator";
import { Pagination } from "@shared/interfaces/pagination.interface";

export class Paginator {
  pages!: number;
  new_page!: number;
  per_page!: number;
  total!: number;
  current_page!: number;

  constructor(config: Pagination = {
    current_page: 0,
    new_page: 0,
    pages: 0,
    per_page: 0,
    total: 0
  }) {
    Object.assign(this, config);
  }

  public onSetUpPaginador(pagination: Pagination): this {

    const { current_page, per_page, total, pages } = pagination ?? {};
    Object.assign(this, { current_page: current_page - 1, per_page, pages, total });
    console.log(this);
    return this;

  }

  public onChangePage(event: PageEvent): this {
    this.new_page = event.pageIndex + 1;
    this.per_page = event.pageSize;
    return this;
  }

  public onHideDisplayedPaginator(paginador: Paginator): boolean {
    // console.log(paginador);
    return (paginador && paginador.total !== 0 && paginador.pages > 1);
  }

}