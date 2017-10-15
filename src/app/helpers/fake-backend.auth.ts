import { Http, BaseRequestOptions, BaseResponseOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
  // congigure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    const testUser = {
      username: 'test',
      password: 'test',
      firstName: 'Test',
      lastName: 'User'
    };

    // wrap in timeout to simulate server api call
    setTimeout(
      () => {
        // fake auth api endpoint
        if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
          const params = JSON.parse(connection.request.getBody());

          if (params.username === testUser.username && params.password === testUser.password) {
            connection.mockRespond(new Response(
              new ResponseOptions({
                status: 200,
                body: {
                  token: 'fake-jwt-token'
                }
              })
            ));
          } else {
            connection.mockRespond(new Response(
              new ResponseOptions({
                status: 200
              })
            ));
          }
        }
      }, 1000
    );
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use to backendless development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [
    MockBackend,
    BaseRequestOptions
  ]
};
