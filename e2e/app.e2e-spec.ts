import { Ng2B2cPage } from './app.po';

describe('ng2-b2c App', function() {
  let page: Ng2B2cPage;

  beforeEach(() => {
    page = new Ng2B2cPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
