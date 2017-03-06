import { AniPage } from './app.po';

describe('ani App', () => {
  let page: AniPage;

  beforeEach(() => {
    page = new AniPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
