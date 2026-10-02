export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Keep published .html URLs and /i/#token without canonical redirects.
    // Fragments stay in the browser; queries are retained when rewriting.
    if (url.pathname === '/') url.pathname = '/index.html';
    if (url.pathname === '/i' || url.pathname === '/i/') {
      url.pathname = '/i/index.html';
    }
    const response = await env.ASSETS.fetch(new Request(url, request));
    if (new URL(request.url).hostname.endsWith('.workers.dev')) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return response;
  },
};
