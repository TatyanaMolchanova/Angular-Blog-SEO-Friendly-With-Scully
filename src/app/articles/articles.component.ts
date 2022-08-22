import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from "@scullyio/ng-lib";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public posts: ScullyRoute[] = [];
  private routeSub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scullyService: ScullyRoutesService,
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.scullyService.available$.subscribe(posts => {
      this.posts = posts.filter(post => post.title);
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

}
