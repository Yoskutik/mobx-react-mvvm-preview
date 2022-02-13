import React, { VFC } from 'react';
import { injectable } from 'tsyringe';
import { computed, makeObservable } from 'mobx';
import { childView, view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { HBox, VBox } from '@components';
import { ArticlesService, TArticle } from '@services';
import type { AppViewModel } from './App';

type ArticleProps = {
  data: TArticle;
};

@injectable()
class ArticlesViewModel extends ViewModel<AppViewModel, ArticleProps> {
  @computed get read(): boolean {
    return this.isActive && this.articlesService.readIds.has(this.viewProps.data.id);
  }

  constructor(public articlesService: ArticlesService) {
    super();
    makeObservable(this);
  }

  onRead = () => this.articlesService.read(this.viewProps.data);
}

const Article: VFC<ArticleProps> = view(ArticlesViewModel)(({ viewModel, data }) => (
  <VBox cls={`article ${viewModel.read ? 'read' : ''}`} key={Math.random()} justify="space-between">
    <h2 className="article__title">{data.title}</h2>
    <button className="article__btn" onClick={viewModel.onRead}>
      Read
    </button>
  </VBox>
));

export const Articles = childView<AppViewModel>(({ viewModel }) => (
  <HBox wrap cls="articles">
    {viewModel.data.map(it => <Article data={it} key={it.id}/>)}
  </HBox>
));
