import { TestBed } from '@angular/core/testing';

import { PostService } from './fake-api.service';

describe('FakeApiService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
